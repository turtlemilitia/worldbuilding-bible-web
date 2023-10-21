import 'remirror/styles/extension-placeholder.css'; // placeholder styling
import React, { JSX, useCallback } from 'react'
import {
  EditorComponent,
  OnChangeJSON,
  PlaceholderExtension,
  Remirror,
  useRemirror,
  useRemirrorContext
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
} from 'remirror/extensions'
import { IdeaListExtension, IdeaListItemExtension } from '../../../utils/remirror/extensions/IdeaListItemExtension'
import { RemirrorJSON } from 'remirror'

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
      new PlaceholderExtension({ placeholder })
    ],
    content: value ? JSON.parse(value) : undefined,
    selection: 'end'
  })

  const handleEditorChange = useCallback((json: RemirrorJSON) => {
    onChange(JSON.stringify(json))
  }, [])

  return (
    <div className="remirror-theme">
      <Remirror manager={manager} initialContent={state}>
        <EditorComponent/>
        <OnChangeJSON onChange={handleEditorChange}/>
      </Remirror>
      <pre>{value}</pre>
    </div>
  )

}

export default Editor
