import React, { JSX, useCallback, useEffect, useMemo, useState } from 'react'
import SimpleMdeReact from 'react-simplemde-editor'
import SimpleMDE from "easymde";
import type { Editor, EditorEventMap, KeyMap, Position } from "codemirror";
import "easymde/dist/easymde.min.css";
import ReactMarkdown from 'react-markdown'
import { renderToString } from 'react-dom/server'
import remarkGfm from 'remark-gfm'

interface EmailFieldProps {
  value: string;
  onChange: (value: string) => any;
  placeholder?: string;
}

const DiscreetTextareaField = (props: EmailFieldProps): JSX.Element => {

  // simple mde
  const [simpleMdeInstance, setMdeInstance] = useState<SimpleMDE | null>(null);

  const getMdeInstanceCallback = useCallback((simpleMde: SimpleMDE) => {
    setMdeInstance(simpleMde);
  }, []);

  useEffect(() => {
    simpleMdeInstance &&
    console.info("Hey I'm editor instance!", simpleMdeInstance);
  }, [simpleMdeInstance]);

  // codemirror
  const [codemirrorInstance, setCodemirrorInstance] = useState<Editor | null>(
    null
  );
  const getCmInstanceCallback = useCallback((editor: Editor) => {
    setCodemirrorInstance(editor);
  }, []);

  useEffect(() => {
    codemirrorInstance &&
    console.info("Hey I'm codemirror instance!", codemirrorInstance);
  }, [codemirrorInstance]);

  // line and cursor
  const [lineAndCursor, setLineAndCursor] = useState<Position | null>(null);

  const getLineAndCursorCallback = useCallback((position: Position) => {
    setLineAndCursor(position);
  }, []);

  useEffect(() => {
    lineAndCursor &&
    console.info("Hey I'm line and cursor info!", lineAndCursor);
  }, [lineAndCursor]);

  const customRendererOptions = useMemo(() => {
    return {
      previewRender() {
        return renderToString(
          <ReactMarkdown remarkPlugins={[[remarkGfm, {singleTilde: true}]]}>
            {props.value}
          </ReactMarkdown>
        );
      },
    } as SimpleMDE.Options;
  }, []);

  return (
    <SimpleMdeReact
      {...props}
      options={customRendererOptions}
      getMdeInstance={getMdeInstanceCallback}
      getCodemirrorInstance={getCmInstanceCallback}
      getLineAndCursor={getLineAndCursorCallback}
      textareaProps={{
        className: "w-full border-none bg-transparent px-3 py-3 text-inherit placeholder:text-stone-400 outline-none"
      }}
    />
  )
}

export default DiscreetTextareaField