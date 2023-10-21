import { FunctionComponent, JSX } from 'react'
import { LightbulbIcon } from 'lucide-react'

const IdeaNode: FunctionComponent = (): JSX.Element => {
  return (
    <span className='flex items-center h-5 rounded'>
      <input type='checkbox' className='hidden'/>
      <label
        className={`flex items-center justify-center w-5 h-5`}>
        <LightbulbIcon/>
      </label>
    </span>
  )
}

export default IdeaNode