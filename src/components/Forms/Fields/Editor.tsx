import 'remirror/styles/all.css';

import React, {JSX, useEffect} from 'react'
import {Remirror, useRemirror, useRemirrorContext} from "@remirror/react";
import {
  BoldExtension,
  CalloutExtension,
  ItalicExtension,
  BulletListExtension,
  OrderedListExtension,
  TaskListExtension,
  TaskListItemExtension,
} from 'remirror/extensions';
import {MarkdownExtension} from "@remirror/extension-markdown";

interface TProps {
  value: string;
  onChange: (value: string) => any;
  placeholder?: string;
}

const Editor = ({value, onChange, placeholder}: TProps): JSX.Element => {


  const {manager, state} = useRemirror({
    extensions: () => [
      new BoldExtension(),
      new ItalicExtension(),
      new CalloutExtension({defaultType: 'warn'}), // Override defaultType: 'info'
      new BulletListExtension({extraAttributes: {class: 'list-disc ml-5'}}),
      new OrderedListExtension({extraAttributes: {class: 'list-decimal ml-5'}}),
      new TaskListExtension({extraAttributes: {class: 'ml-5'}}),
      new TaskListItemExtension({nodeOverride: {}}),
      new MarkdownExtension()
    ],
    content: value,
    selection: 'end',
    stringHandler: 'markdown',
  });

  return (
    <div className='remirror-theme'>
      {/* the className is used to define css variables necessary for the editor */}
      <Remirror manager={manager} initialContent={state} onChange={({helpers}) => {

        onChange(helpers.getMarkdown())

      }}/>
    </div>
  )

}

export default Editor
