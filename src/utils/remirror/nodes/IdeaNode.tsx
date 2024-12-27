import { FunctionComponent, JSX } from 'react'
import {
  AlertTriangle,
  BrushIcon,
  CalendarIcon,
  CoinsIcon, CompassIcon,
  DicesIcon,
  DramaIcon,
  EyeOffIcon,
  FingerprintIcon,
  HeartIcon,
  HelpCircleIcon,
  InfoIcon,
  KeyIcon,
  LightbulbIcon,
  LockIcon,
  MapPinIcon,
  MusicIcon,
  PenIcon,
  QuoteIcon,
  StarIcon,
  SwordsIcon,
  WandIcon,
} from 'lucide-react'

type TProps = {
  type: string;
}
const IdeaNode: FunctionComponent<TProps> = ({ type = 'i' }): JSX.Element => {
  return (
    <span className='flex items-center rounded'>
      <input type='checkbox' className='hidden'/>
      <label className={`flex items-center justify-center w-4 h-4`}>
        { type === 'd' && <BrushIcon className="text-amber-500"/>}
        { type === 'D' && <DramaIcon className="text-amber-500"/>}
        { type === 'e' && <CompassIcon className="text-amber-500"/>}
        { type === 'h' && <CalendarIcon className="text-emerald-600"/>}
        { type === 'i' && <InfoIcon className="text-blue-500"/>}
        { type === 'I' && <LightbulbIcon className="text-amber-500"/>}
        { type === 'k' && <KeyIcon className="text-yellow-500"/>}
        { type === 'l' && <MapPinIcon className="text-green-600"/>}
        { type === 'L' && <LockIcon className="text-red-800"/>}
        { type === 'm' && <MusicIcon className="text-gray-500"/>}
        { type === 'p' && <PenIcon className="text-blue-500"/>}
        { type === 'P' && <FingerprintIcon className="text-blue-500"/>}
        { type === 'r' && <DicesIcon className="text-amber-500"/>}
        { type === 's' && <SwordsIcon className="text-amber-500"/>}
        { type === 'S' && <EyeOffIcon className="text-red-800"/>}
        { type === 'w' && <WandIcon className="text-emerald-600"/>}
        { type === '?' && <HelpCircleIcon className="text-fuchsia-500"/>}
        { type === '!' && <AlertTriangle className="text-amber-600"/>}
        { type === '"' && <QuoteIcon className="text-emerald-600"/>}
        { type === '*' && <StarIcon className="text-amber-500"/>}
        { type === '$' && <CoinsIcon className="text-emerald-600"/>}
        { type === '<3' && <HeartIcon className="text-red-600"/>}
      </label>
    </span>
  )
}

export default IdeaNode