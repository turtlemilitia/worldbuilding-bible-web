// import 'remirror/styles/all.css';

import React, { JSX, useCallback, useEffect } from 'react'
import { EditorComponent, OnChangeJSON, Remirror, useRemirror, useRemirrorContext } from '@remirror/react'
import {
  BoldExtension,
  CalloutExtension,
  ItalicExtension,
  BulletListExtension,
  OrderedListExtension,
  TaskListExtension,
  TaskListItemExtension,
  HeadingExtension,
} from 'remirror/extensions';
import {MarkdownExtension} from "@remirror/extension-markdown";
import { IdeaListExtension, IdeaListItemExtension } from '../../../utils/remirror/extensions/IdeaListItemExtension'
import { RemirrorJSON } from 'remirror'

interface TProps {
  value: string;
  onChange: (value: string) => any;
  placeholder?: string;
}

const Editor = ({value, onChange, placeholder}: TProps): JSX.Element => {

  const {manager, state} = useRemirror({
    extensions: () => [
      new HeadingExtension(),
      new BoldExtension(),
      new ItalicExtension(),
      new CalloutExtension({defaultType: 'warn'}), // Override defaultType: 'info'
      new BulletListExtension({extraAttributes: {class: 'list-disc ml-5'}}),
      new OrderedListExtension({extraAttributes: {class: 'list-decimal ml-5'}}),
      new TaskListExtension({extraAttributes: {class: 'ml-5'}}),
      new TaskListItemExtension(),
      // new MarkdownExtension({ // markdown not working right now
      //   htmlToMarkdown: (html) => {
      //     return MarkdownExtension.defaultOptions.htmlToMarkdown(html)
      //   }
      // }),
      new IdeaListExtension(),
      new IdeaListItemExtension()
    ],
    content: value ? JSON.parse(value) : undefined,
    selection: 'end'
  });

  const handleEditorChange = useCallback((json: RemirrorJSON) => {
    onChange(JSON.stringify(json));
  }, []);

  return (
    <div className='remirror-theme'>
      {/* the className is used to define css variables necessary for the editor */}
      <Remirror manager={manager} initialContent={state}>
        <EditorComponent/>
        <OnChangeJSON onChange={handleEditorChange}/>
      </Remirror>
      <pre>{value}</pre>
    </div>
  )

}

export default Editor
