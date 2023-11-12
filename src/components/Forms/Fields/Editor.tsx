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
  MarkdownExtension,
} from 'remirror/extensions'
import { IdeaListExtension, IdeaListItemExtension } from '../../../utils/remirror/extensions/IdeaListItemExtension'
import { AnyExtension } from 'remirror'
import { turndownService } from '../../../utils/remirror/turndownService'
import { RemirrorEventListenerProps } from '@remirror/core'
import { unified, Plugin } from 'unified'
import remarkParse from 'remark-parse'
import remark2rehype from 'remark-rehype'
import remarkGfm from 'remark-gfm'
import rehypeStringify from 'rehype-stringify'
import { visit } from 'unist-util-visit'
import ideaListPlugin from '../../../utils/remirror/remark/ideaListPlugin'

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
          const html = unified()
            .use(remarkParse)
            .use(remarkGfm)
            .use(ideaListPlugin)
            .use(remark2rehype)
            .use(rehypeStringify)
            .processSync(markdown)
            .toString();
          return html;
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
