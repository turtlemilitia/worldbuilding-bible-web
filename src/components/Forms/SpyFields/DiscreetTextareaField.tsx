import React, { JSX, useCallback, useEffect, useMemo, useState } from 'react'
import { Editor, defaultValueCtx, rootCtx, editorViewOptionsCtx } from '@milkdown/core'
import { nord } from '@milkdown/theme-nord'
import { Milkdown, MilkdownProvider, useEditor, useInstance } from '@milkdown/react'
import { commonmark, headingAttr, listItemAttr, paragraphAttr } from '@milkdown/preset-commonmark'
import { listener, listenerCtx } from '@milkdown/plugin-listener'

type TMilkDownEditorProps = { value: string, onChange: (value: string) => any };

const MilkdownEditor: React.FC<TMilkDownEditorProps> = ({ value, onChange }) => {

  const { get } = useEditor((root) => {
    return Editor.make()
      .config(nord)
      .use(commonmark)
      .use(listener)
      .config((ctx) => {
        ctx.set(rootCtx, root) // set the DOM element
        ctx.set(defaultValueCtx, value) // set the default value (only gets loaded on mounted)

        // Add attributes to the editor container
        ctx.update(editorViewOptionsCtx, (prev) => ({
          ...prev,
          attributes: { class: 'milkdown-editor mx-auto outline-none', spellcheck: 'false' },
        }))

        // Add attributes to nodes and marks
        ctx.set(headingAttr.key, (node) => {
          const level = node.attrs.level;
          if (level === 1) return { class: 'text-4xl' };
          if (level === 2) return { class: 'text-3xl' };
          return {};
        })
        ctx.set(paragraphAttr.key, () => ({ class: 'text-lg' }))
        ctx.set(listItemAttr.key, () => ({ class: 'list-disc ml-5' }))

        ctx.get(listenerCtx)
          .markdownUpdated((ctx, markdown) => { // listen to the change in value
            onChange(markdown)
          })
      })
  }, [])

  return <Milkdown/>
}

interface TextareaFieldProps {
  value: string;
  onChange: (value: string) => any;
  placeholder?: string;
}

const DiscreetTextareaField = ({ value, onChange, placeholder }: TextareaFieldProps): JSX.Element => {

  return (
    <MilkdownProvider>
      <MilkdownEditor value={value} onChange={onChange}/>
    </MilkdownProvider>
  )

}

export default DiscreetTextareaField