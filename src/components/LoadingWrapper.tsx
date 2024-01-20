import { FunctionComponent, JSX, PropsWithChildren } from 'react'
import LoadingSpinner from './LoadingSpinner'

interface TProps extends PropsWithChildren {
  loading: boolean
  colour?: 'stone-900'|'stone-200'|'transparent'
  positioning?: 'fixed'|'absolute'
  opacity?: '0'|'10'|'20'|'30'|'40'|'50'|'60'|'70'|'80'|'90'|'100'
}

const LoadingWrapper: FunctionComponent<TProps> = ({
  children,
  loading,
  colour = 'stone-900',
  positioning = 'fixed',
  opacity = '50'
}): JSX.Element => {

  const colourHandler = `bg-${colour}`;
  const opacityHandler = `bg-opacity-${opacity}`;

  return (
    <div className="relative">
      {loading ? (
        <div
          className={`${positioning} z-50 top-0 ${colourHandler} w-full ${opacityHandler} h-full ${colour !== 'transparent' ? 'backdrop-blur-md' : ''} flex flex-wrap place-content-center`}>
          <LoadingSpinner size={30}/>
        </div>
      ) : ''}
      {children}
    </div>
  )
}

export default LoadingWrapper