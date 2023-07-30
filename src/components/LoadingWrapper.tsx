import { FunctionComponent, JSX, PropsWithChildren } from 'react'
import LoadingSpinner from './LoadingSpinner'

interface TProps extends PropsWithChildren {
  loading: boolean
}

const LoadingWrapper: FunctionComponent<TProps> = ({ children, loading }): JSX.Element => {
  return (
    <div className="relative">
      {loading ? (
        <div
          className="absolute z-50 w-full h-full bg-stone-900 bg-opacity-50 flex place-items-center justify-center">
          <LoadingSpinner/>
        </div>
      ) : ''}
      {children}
    </div>
  )
}

export default LoadingWrapper