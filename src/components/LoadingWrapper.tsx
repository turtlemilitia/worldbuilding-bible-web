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
          className={`fixed z-50 top-0 bg-stone-900 w-screen bg-opacity-50 h-screen backdrop-blur-md flex flex-wrap place-content-center`}>
          <LoadingSpinner/>
        </div>
      ) : ''}
      {children}
    </div>
  )
}

export default LoadingWrapper