import { Node, ReactNodeViewRenderer } from '@tiptap/react'
import { KeyboardShortcutCommand, wrappingInputRule } from '@tiptap/core'
import IdeaNodeWrapped from '@/components/Forms/Fields/Editor/IdeaNodeWrapped'

export const IdeaListItem = Node.create({
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

  addKeyboardShortcuts () {
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