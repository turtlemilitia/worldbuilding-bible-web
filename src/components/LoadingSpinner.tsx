import { FunctionComponent, JSX } from 'react'
import { Loader2 } from 'lucide-react'

const LoadingSpinner: FunctionComponent = (): JSX.Element => {
  return <Loader2 className="animate-spin h-10 w-10 stroke-stone-300"/>
}

export default LoadingSpinner;