import { FunctionComponent, JSX } from 'react'
import { NodeViewComponentProps } from '@remirror/react'
import { LightbulbIcon } from 'lucide-react'

const IdeaNode: FunctionComponent<NodeViewComponentProps> = ({ forwardRef }: NodeViewComponentProps): JSX.Element => {
  return (
    <li data-idea-list-item="true">
      <div className="inline-block">
        <span className="flex items-center h-5 rounded">
      <label
        className={`flex items-center justify-center w-5 h-5`}>
          <LightbulbIcon/>
      </label>
        </span>
      </div>
      <div className="inline-block" ref={forwardRef}/>
    </li>
  )
}

export default IdeaNode