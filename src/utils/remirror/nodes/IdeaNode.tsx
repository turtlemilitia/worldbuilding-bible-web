import { FunctionComponent, JSX } from 'react'
import {
  AlertTriangle, DollarSignIcon,
  HelpCircleIcon,
  InfoIcon,
  KeyIcon,
  LightbulbIcon,
  MapPinIcon,
  QuoteIcon,
  StarIcon
} from 'lucide-react'

type TProps = {
  type: string;
}
const IdeaNode: FunctionComponent<TProps> = ({ type = 'i' }): JSX.Element => {
  return (
    <span className='flex items-center rounded'>
      <input type='checkbox' className='hidden'/>
      <label className={`flex items-center justify-center w-4 h-4`}>
        { type === 'i' && <InfoIcon className="text-blue-500"/>}
        { type === 'I' && <LightbulbIcon className="text-amber-500"/>}
        { type === 'k' && <KeyIcon className="text-amber-500"/>}
        { type === 'l' && <MapPinIcon className="text-pink-600"/>}
        { type === '?' && <HelpCircleIcon className="text-amber-500"/>}
        { type === '!' && <AlertTriangle className="text-amber-500"/>}
        { type === '"' && <QuoteIcon className="text-emerald-600"/>}
        { type === '*' && <StarIcon className="text-amber-500"/>}
        { type === '$' && <DollarSignIcon className="text-emerald-600"/>}
      </label>
    </span>
  )
}

export default IdeaNode