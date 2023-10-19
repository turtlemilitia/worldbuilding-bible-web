import {FunctionComponent} from "react";
import { LightbulbIcon } from 'lucide-react'

const IdeaCheckbox: FunctionComponent = () => {
  return (
    <span className='flex items-center h-10 rounded'>
      <input type='checkbox' className='hidden'/>
      <label
        className={`flex items-center justify-center w-5 h-5`}>
        <LightbulbIcon/>
      </label>
    </span>
  )
}

export default IdeaCheckbox;
