import { FunctionComponent, JSX } from 'react'
import { AlertTriangle, HelpCircleIcon, InfoIcon, KeyIcon, LightbulbIcon, QuoteIcon } from 'lucide-react'

type TProps = {
  type: string;
}
const IdeaNode: FunctionComponent<TProps> = ({ type = 'i' }): JSX.Element => {
  return (
    <span className='flex items-center h-5 rounded'>
      <input type='checkbox' className='hidden'/>
      <label
        className={`flex items-center justify-center w-5 h-5`}>
        { type === 'i' && <InfoIcon/>}
        { type === 'I' && <LightbulbIcon/>}
        { type === 'k' && <KeyIcon/>}
        { type === '?' && <HelpCircleIcon/>}
        { type === '!' && <AlertTriangle/>}
        { type === '"' && <QuoteIcon/>}
      </label>
    </span>
  )
}

export default IdeaNode