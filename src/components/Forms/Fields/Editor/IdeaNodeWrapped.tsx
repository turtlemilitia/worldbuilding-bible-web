import { NodeViewProps } from '@tiptap/core'
import { NodeViewContent, NodeViewWrapper } from '@tiptap/react'
import IdeaNode from '@/utils/remirror/nodes/IdeaNode'
import React from 'react'

const IdeaNodeWrapped = (props: NodeViewProps) => {
  return (
    <NodeViewWrapper className={'flex-column flex items-start gap-2'}>
      <div className="mt-3" contentEditable={false}>
        <IdeaNode type={props.node.attrs.ideaType}/>
      </div>
      <NodeViewContent as={'span'}/>
    </NodeViewWrapper>
  )
}
export default IdeaNodeWrapped