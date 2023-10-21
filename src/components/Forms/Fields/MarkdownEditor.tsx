/**
 * NOT WORKING
 *
 * Markdown proving difficult at the moment.
 * Will work with remirror/prosemirror JSON for now...
 */

import React, { JSX, useCallback, useState } from 'react'
import { Remirror, useRemirror } from '@remirror/react'
import {
  BoldExtension,
  CalloutExtension,
  ItalicExtension,
  BulletListExtension,
  OrderedListExtension,
  TaskListExtension,
  TaskListItemExtension,
  HeadingExtension,
} from 'remirror/extensions'
import { MarkdownExtension } from '@remirror/extension-markdown'
import { IdeaListExtension, IdeaListItemExtension } from '../../../utils/remirror/extensions/IdeaListItemExtension'
import { RemirrorJSON } from 'remirror'
import TurndownService from 'turndown'
import marked from 'marked'

interface TProps {
  value: string;
  onChange: (value: string) => any;
  placeholder?: string;
}

const Editor = ({ value, onChange, placeholder }: TProps): JSX.Element => {

  const [markdown, setMarkdown] = useState('')
  const { manager, state } = useRemirror({
    extensions: () => [
      new HeadingExtension(),
      new BoldExtension(),
      new ItalicExtension(),
      new CalloutExtension({ defaultType: 'warn' }), // Override defaultType: 'info'
      new BulletListExtension({ extraAttributes: { class: 'list-disc ml-5' } }),
      new OrderedListExtension({ extraAttributes: { class: 'list-decimal ml-5' } }),
      new TaskListExtension({ extraAttributes: { class: 'ml-5' } }),
      new TaskListItemExtension(),
      new MarkdownExtension({ // markdown not working right now
        htmlToMarkdown: (html) => {
          return new TurndownService()
            .addRule('ideaListItems', {
              filter: (node) => {
                return node.nodeName === 'LI' && node.hasAttribute('data-idea-list-item')
              },
              replacement: (content, node) => {
                return `- [i] ${content.trimStart()}`
              }
            })
            .turndown(html)
        }
      }),
      new IdeaListExtension(),
      new IdeaListItemExtension()
    ],
    content: value,
    selection: 'end',
    stringHandler: 'markdown'
  })

  const handleEditorChange = useCallback((json: RemirrorJSON) => {
    onChange(JSON.stringify(json))
  }, [])

  return (
    <div className="remirror-theme">
      {/* the className is used to define css variables necessary for the editor */}
      <Remirror manager={manager} initialContent={state} onChange={({ helpers }) => {

        onChange(helpers.getMarkdown())

      }}/>
        {/*<EditorComponent/>*/}
        {/*<OnChangeJSON onChange={handleEditorChange}/>*/}
      {/*</Remirror>*/}
      <pre>{value}</pre>
      <pre>{markdown}</pre>
    </div>
  )

}

export default Editor
