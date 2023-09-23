import { FunctionComponent, JSX } from 'react'
import { Loader2Icon } from 'lucide-react'

type TProps = {
  size?: number;
}
const LoadingSpinner: FunctionComponent<TProps> = ({size = 10}): JSX.Element => {
  return <Loader2Icon className={`animate-spin h-${size} w-${size} stroke-stone-300`}/>
}

export default LoadingSpinner;