import 'remirror/styles/extension-placeholder.css'
import React, { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { Remirror, useRemirror } from '@remirror/react'
import { AnyExtension } from 'remirror'
import { RemirrorEventListenerProps } from '@remirror/core'

import { getExtensions } from './extensions';
import { TEditorProps } from './types'

const Editor: FunctionComponent<TEditorProps> = ({ id, className, initialValue, onChange, placeholder, canEdit }) => {

  const [identifier, setIdentifier] = useState<string>(String(Math.random()))

  const { manager, state, getContext } = useRemirror({
    extensions: () => getExtensions(placeholder),
    content: initialValue,
    stringHandler: 'markdown',
    selection: 'end',
  })

  const handleEditorChange = useCallback(({ helpers }: RemirrorEventListenerProps<AnyExtension>) => {
    onChange(helpers.getMarkdown())
  }, [onChange])

  useEffect(() => {
    if (id !== identifier) {
      setIdentifier(id)
      getContext()?.setContent(initialValue || '')
    }
  }, [id, initialValue])

  return (
    <div className={`remirror-theme font-serif text-serif-lg ${className}`}>
      <Remirror editable={canEdit} manager={manager} initialContent={state} onChange={handleEditorChange}/>
    </div>
  )
}

export default Editor