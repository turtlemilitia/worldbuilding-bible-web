import { FunctionComponent, JSX, PropsWithChildren } from 'react'
import LoadingSpinner from './LoadingSpinner'

interface TProps extends PropsWithChildren {
  loading: boolean
  colour?: 'stone-900'|'stone-200'|'transparent'
}

const LoadingWrapper: FunctionComponent<TProps> = ({ children, loading, colour = 'stone-900' }): JSX.Element => {
  return (
    <div className="relative">
      {loading ? (
        <div
          className={`absolute z-50 top-0 bg-${colour} w-full bg-opacity-50 h-full ${colour !== 'transparent' ? 'backdrop-blur-md' : ''} flex flex-wrap place-content-center`}>
          <LoadingSpinner/>
        </div>
      ) : ''}
      {children}
    </div>
  )
}

export default LoadingWrapper