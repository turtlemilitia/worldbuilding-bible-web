import React, { useCallback, useEffect } from 'react'
import {
  EditorContent,
  mergeAttributes,
  Node, NodeViewContent,
  NodeViewWrapper,
  ReactNodeViewRenderer,
  useEditor,
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import IdeaNode from '@/utils/remirror/nodes/IdeaNode'
import { KeyboardShortcutCommand, wrappingInputRule } from '@tiptap/core'

// Import additional extensions if needed (e.g., TaskList, TaskItem, etc.)

interface TEditorProps {
  className?: string;
  initialValue: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  canEdit?: boolean;
}

const IdeaNodeWrapped = (props) => {
  return (
    <NodeViewWrapper className={'flex-column flex items-start gap-2'}>
      <div className="mt-3" contentEditable={false}>
        <IdeaNode type={props.node.attrs.ideaType}/>
      </div>
      <NodeViewContent as={'span'}/>
    </NodeViewWrapper>
  )
}

const IdeaList = TaskList.extend({
  name: 'ideaList',

  parseHTML () {
    return [
      {
        tag: `ul[data-idea-list]`,
        priority: 51,
      },
    ]
  },

  renderHTML ({ HTMLAttributes }) {
    return [
      'ul',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes,
        { 'data-idea-list': '' }),
      0,
    ]
  },

  addOptions () {
    return {
      itemTypeName: 'ideaListItem',
      HTMLAttributes: {},
    }
  },
})

const IdeaListItem = Node.create({
  name: 'ideaListItem',

  addOptions () {
    return {
      nested: true,
      HTMLAttributes: {},
      ideaListTypeName: 'ideaList',
    }
  },

  content () {
    return this.options.nested ? 'paragraph block*' : 'paragraph+'
  },

  defining: true,

  addAttributes () {
    return {
      ideaType: {
        default: 'i',
        // Customize the HTML parsing (for example, to load the initial content)
        parseHTML: (element) => element.getAttribute('data-idea-type'),
        // … and customize the HTML rendering.
        renderHTML: (attributes) => {
          return {
            'data-idea-type': attributes.ideaType,
          }
        },
      },
    }
  },

  parseHTML () {
    return [
      {
        tag: `li[data-idea-list-item]`,
        priority: 51,
      },
    ]
  },

  renderHTML ({ node, HTMLAttributes }) {

    let dom = document.createElement('div')

    return [
      'li',
      {
        'data-idea-list-item': '',
        'data-idea-type': node.attrs.ideaType ?? 'i',
      },
      ['div', 0],
    ]
  },

  addInputRules () {
    return [
      wrappingInputRule({
        find: /^[*\-.+]*\s*(\[(d?|D|e|h|i|I|k|l|L|m|p|P|r|s|S|w|\?|!|"|\*|\$|<3)]\s)$/,
        type: this.type,
        getAttributes: match => ({
          ideaType: match[match.length - 1],
        }),
      }),
    ]
  },


  addKeyboardShortcuts() {
    const shortcuts: {
      [key: string]: KeyboardShortcutCommand
    } = {
      Enter: () => this.editor.commands.splitListItem(this.name),
      'Shift-Tab': () => this.editor.commands.liftListItem(this.name),
    }

    if (!this.options.nested) {
      return shortcuts
    }

    return {
      ...shortcuts,
      Tab: () => this.editor.commands.sinkListItem(this.name),
    }
  },

  addNodeView () {
    return ReactNodeViewRenderer(IdeaNodeWrapped)
  },
})

const Editor: React.FC<TEditorProps> = ({ className = '', initialValue, onChange, placeholder, canEdit = true }) => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: 'mx-auto min-h-36 focus:outline-none',
      },
    },
    extensions: [
      IdeaList,
      IdeaListItem,
      StarterKit,
      TaskList.configure({
        HTMLAttributes: {
          class: 'contains-task-list',
          'data-task-list': true,
        },
      }),
      TaskItem.configure({
        HTMLAttributes: {
          class: 'task-list-item',
          'data-task-list-item': true,
        },
        nested: true,
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
        protocols: ['http', 'https'],
        isAllowedUri: (url, ctx) => {
          try {
            // construct URL
            const parsedUrl = url.includes(':') ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`)

            // use default validation
            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false
            }

            // disallowed protocols
            const disallowedProtocols = ['ftp', 'file', 'mailto']
            const protocol = parsedUrl.protocol.replace(':', '')

            if (disallowedProtocols.includes(protocol)) {
              return false
            }

            // only allow protocols specified in ctx.protocols
            const allowedProtocols = ctx.protocols.map(p => (typeof p === 'string' ? p : p.scheme))

            if (!allowedProtocols.includes(protocol)) {
              return false
            }

            // disallowed domains
            const disallowedDomains = ['example-phishing.com', 'malicious-site.net']
            const domain = parsedUrl.hostname

            if (disallowedDomains.includes(domain)) {
              return false
            }

            // all checks have passed
            return true
          } catch {
            return false
          }
        },
        shouldAutoLink: url => {
          try {
            // construct URL
            const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`)

            // only auto-link if the domain is not in the disallowed list
            const disallowedDomains = ['example-no-autolink.com', 'another-no-autolink.com']
            const domain = parsedUrl.hostname

            return !disallowedDomains.includes(domain)
          } catch {
            return false
          }
        },

      }),
      Placeholder.configure({
        placeholder: placeholder || 'Start typing...',
      }),
      // Add any additional TipTap extensions here (e.g., Callout, TaskList, etc.)
    ],
    content: initialValue,
    editable: canEdit,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      onChange && onChange(html)
    },
  })

  // Clean up the editor on unmount.
  useEffect(() => {
    return () => {
      editor?.destroy()
    }
  }, [editor])

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl) // todo dialog

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink()
        .run()

      return
    }

    // update link
    try {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url })
        .run()
    } catch (e) {
      alert(e.message)
    }
  }, [editor])

  if (!editor) {
    return null
  }

  return (
    <div className={`remirror-theme font-serif text-serif-lg ${className}`}>
      {/*<div className="control-group">
        <div className="button-group">
          <button onClick={setLink} className={editor.isActive('link') ? 'is-active' : ''}>
            Set link
          </button>
          <button
            onClick={() => editor.chain().focus().unsetLink().run()}
            disabled={!editor.isActive('link')}
          >
            Unset link
          </button>
        </div>
        <div className="button-group">
          <button
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            className={editor.isActive('taskList') ? 'is-active' : ''}
          >
            Toggle task list
          </button>
          <button
            onClick={() => editor.chain()
              .focus()
              .splitListItem('taskItem')
              .run()}
            disabled={!editor.can().splitListItem('taskItem')}
          >
            Split list item
          </button>
          <button
            onClick={() => editor.chain()
              .focus()
              .sinkListItem('taskItem')
              .run()}
            disabled={!editor.can().sinkListItem('taskItem')}
          >
            Sink list item
          </button>
          <button
            onClick={() => editor.chain()
              .focus()
              .liftListItem('taskItem')
              .run()}
            disabled={!editor.can().liftListItem('taskItem')}
          >
            Lift list item
          </button>
        </div>
      </div>*/}
      <EditorContent editor={editor}/>
    </div>
  )
}

export default Editor