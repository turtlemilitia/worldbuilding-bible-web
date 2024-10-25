import 'remirror/styles/extension-placeholder.css'
import React, { FunctionComponent, useCallback } from 'react'
import {Remirror, useRemirror} from '@remirror/react'
import { AnyExtension } from 'remirror'
import { RemirrorEventListenerProps } from '@remirror/core'

import { getExtensions } from './extensions';
import { TEditorProps } from './types'

const Editor: FunctionComponent<TEditorProps> = ({ className, initialValue, onChange, placeholder, canEdit }) => {

  const { manager } = useRemirror({
    extensions: () => getExtensions(placeholder),
    content: initialValue,
    stringHandler: 'markdown',
    selection: 'end',
  })

  const handleEditorChange = useCallback(({ helpers }: RemirrorEventListenerProps<AnyExtension>) => {
    onChange && onChange(helpers.getMarkdown())
  }, [onChange])

  return (
    <div className={`remirror-theme font-serif text-serif-lg ${className}`}>
      <Remirror editable={canEdit} manager={manager} initialContent={initialValue} onChange={handleEditorChange}/>
    </div>
  )
}

export default Editor