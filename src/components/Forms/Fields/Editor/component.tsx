import 'remirror/styles/extension-placeholder.css'
import React, { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { Remirror, useRemirror } from '@remirror/react'
import { AnyExtension } from 'remirror'
import { RemirrorEventListenerProps } from '@remirror/core'
import { useLocation } from 'react-router-dom'

import { getExtensions } from './extensions';
import { TEditorProps } from './types'

const Editor: FunctionComponent<TEditorProps> = ({ initialValue, onChange, placeholder }) => {

  const { manager, state, getContext } = useRemirror({
    extensions: () => getExtensions(placeholder),
    content: initialValue,
    stringHandler: 'markdown',
    selection: 'end',
  })

  const handleEditorChange = useCallback(({ helpers }: RemirrorEventListenerProps<AnyExtension>) => {
    onChange(helpers.getMarkdown())
  }, [])

  useEffect(() => {
    getContext()?.setContent(initialValue)
  }, [initialValue])

  return (
    <div className="remirror-theme">
      <Remirror manager={manager} initialContent={state} onChange={handleEditorChange}/>
    </div>
  )
}

export default Editor