import 'remirror/styles/extension-placeholder.css'; // placeholder styling
import React, { JSX, useCallback } from 'react'
import {
  PlaceholderExtension,
  Remirror,
  useRemirror
} from '@remirror/react'
import {
  BoldExtension,
  CalloutExtension,
  ItalicExtension,
  BulletListExtension,
  OrderedListExtension,
  TaskListExtension,
  TaskListItemExtension,
  HeadingExtension,
  BlockquoteExtension,
} from 'remirror/extensions'
import { IdeaListExtension, IdeaListItemExtension } from '../../../utils/remirror/extensions/IdeaListItemExtension'
import { AnyExtension } from 'remirror'
import { MarkdownExtension } from '@remirror/extension-markdown'
import { turndownService } from '../../../utils/remirror/turndownService'
import { marked } from 'marked'
import { RemirrorEventListenerProps } from '@remirror/core'
import '../../../utils/remirror/markedService'

interface TProps {
  value: string;
  onChange: (value: string) => any;
  placeholder?: string;
}

const Editor = ({ value, onChange, placeholder }: TProps): JSX.Element => {

  const { manager, state } = useRemirror({
    extensions: () => [
      new HeadingExtension(),
      new BoldExtension(),
      new ItalicExtension(),
      new CalloutExtension({ defaultType: 'warn' }), // Override defaultType: 'info'
      new BulletListExtension(),
      new OrderedListExtension(),
      new TaskListExtension(),
      new TaskListItemExtension(),
      new IdeaListExtension(),
      new IdeaListItemExtension(),
      new BlockquoteExtension(),
      new MarkdownExtension({ // markdown not working right now
        htmlToMarkdown: (html) => {
          return turndownService.turndown(html)
        },
        markdownToHtml: (markdown, sanitizer) => {
          return marked(markdown, { gfm: true, smartLists: true, xhtml: true, sanitizer });
        }
      }),
      new PlaceholderExtension({ placeholder })
    ],
    content: value,
    stringHandler: 'markdown',
    selection: 'end'
  })

  const handleEditorChange = useCallback(({ helpers }: RemirrorEventListenerProps<AnyExtension>) => {

    onChange(helpers.getMarkdown())

  }, [])

  return (
    <div className="remirror-theme">
      <Remirror manager={manager} initialContent={state} onChange={handleEditorChange}/>
      <pre>{value}</pre>
    </div>
  )

}

export default Editor
