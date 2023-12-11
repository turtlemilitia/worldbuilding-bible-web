import 'remirror/styles/extension-placeholder.css'
import React, { FunctionComponent, useCallback, useEffect } from 'react'
import { Remirror, useRemirror } from '@remirror/react'
import { AnyExtension } from 'remirror'
import { RemirrorEventListenerProps } from '@remirror/core'
import { useLocation } from 'react-router-dom'

import { useEditorExtensions } from './extensions';
import { TEditorProps } from './types'

const Editor: FunctionComponent<TEditorProps> = ({ value, onChange, placeholder }) => {
  const location = useLocation()
  const { manager, state, getContext } = useRemirror({
    extensions: () => useEditorExtensions(placeholder),
    content: value,
    stringHandler: 'markdown',
    selection: 'end',
  })
  const handleEditorChange = useCallback(({ helpers }: RemirrorEventListenerProps<AnyExtension>) => {
    onChange(helpers.getMarkdown())
  }, [])
  useEffect(() => {
    if (location.pathname.includes('new')) {
      getContext()?.setContent('')
    }
  }, [location.pathname])

  return (
    <div className="remirror-theme">
      <Remirror manager={manager} initialContent={state} onChange={handleEditorChange}/>
    </div>
  )
}

export default Editor