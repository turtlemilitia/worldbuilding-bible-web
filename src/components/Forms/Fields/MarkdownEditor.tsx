import React, { JSX, useCallback, useEffect, useMemo, useState } from 'react'
import { Editor, defaultValueCtx, rootCtx, editorViewOptionsCtx } from '@milkdown/core'
import { Milkdown, MilkdownProvider, useEditor, useInstance } from '@milkdown/react'
import {
  blockquoteAttr,
  bulletListAttr,
  commonmark,
  headingAttr,
  hrAttr,
  listItemAttr,
  orderedListAttr,
  paragraphAttr
} from '@milkdown/preset-commonmark'
import { gfm } from '@milkdown/preset-gfm'
import { listener, listenerCtx } from '@milkdown/plugin-listener'
import { extendListItemSchemaForTask } from '../../../utils/markdownSchemas/taskListItem'

type TMilkDownEditorProps = { value: string, onChange: (value: string) => any };

const MilkdownEditor: React.FC<TMilkDownEditorProps> = ({ value, onChange }) => {

  const { get } = useEditor((root) => {
    return Editor.make()
      .use(commonmark)
      .use(gfm)
      .use(listener)
      .config((ctx) => {
        ctx.set(rootCtx, root) // set the DOM element
        ctx.set(defaultValueCtx, value) // set the default value (only gets loaded on mounted)

        // Add attributes to the editor container
        ctx.update(editorViewOptionsCtx, (prev) => ({
          ...prev,
          attributes: { class: 'markdown-editor mx-auto outline-none min-h-96', spellcheck: 'false' },
        }))

        // Add attributes to nodes and marks
        ctx.set(headingAttr.key, (node) => {
          const level = node.attrs.level;
          if (level === 1) return { class: 'bold my-4 text-stone-700 text-4xl' };
          if (level === 2) return { class: 'bold my-4 text-stone-700 text-3xl' };
          if (level === 3) return { class: 'bold my-4 text-stone-700 text-2xl' };
          if (level === 4) return { class: 'bold my-4 text-stone-700 text-xl' };
          if (level === 5) return { class: 'bold my-4 text-stone-700 text-lg' };
          if (level === 6) return { class: 'bold my-4 text-stone-700 text-md' };
          return {};
        })
        ctx.set(paragraphAttr.key, () => ({ class: 'text-lg my-2' }))
        ctx.set(orderedListAttr.key, () => ({ class: 'list-decimal' }))
        ctx.set(bulletListAttr.key, () => ({ class: 'list-disc' }))
        ctx.set(listItemAttr.key, () => ({ class: 'ml-5' }))
        ctx.set(blockquoteAttr.key, () => ({ class: 'my-4 bg-stone-300 py-1 px-4 border-x border-stone-900' }))
        ctx.set(hrAttr.key, () => ({ class: 'border-t-2 border-stone-500 my-4' }))

        ctx.get(listenerCtx)
          .markdownUpdated((ctx, markdown) => { // listen to the change in value
            onChange(markdown)
          })
      })
      .use(extendListItemSchemaForTask)
  }, [])

  return <Milkdown/>
}

interface TProps {
  value: string;
  onChange: (value: string) => any;
  placeholder?: string;
}

const MarkdownEditor = ({ value, onChange, placeholder }: TProps): JSX.Element => {

  return (
    <MilkdownProvider>
      <MilkdownEditor value={value} onChange={onChange}/>
    </MilkdownProvider>
  )

}

export default MarkdownEditor