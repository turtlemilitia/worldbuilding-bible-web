import React, {
  Fragment,
  FunctionComponent,
  JSX,
  PropsWithChildren,
} from 'react'
import LoadingSpinner from './LoadingSpinner'
import { Transition } from '@headlessui/react'
import { cva, VariantProps } from 'class-variance-authority'
import SansSerifText from './SmallSansSerifText'

const loadingVariants = cva(
  'z-40 top-0 w-full h-full flex flex-wrap place-content-center',
  {
    variants: {
      positioning: {
        fixed: 'fixed',
        absolute: 'absolute',
      },
      colour: {
        transparent: 'bg-transparent',
        dark: 'bg-stone-900 backdrop-blur-md',
        light: 'bg-stone-200 backdrop-blur-md',
      },
      opacity: {
        '50': 'bg-opacity-50',
        '100': 'bg-opacity-100',
      },
    },
    defaultVariants: {
      positioning: 'fixed',
      opacity: '50',
      colour: 'dark',
    },
  },
)

interface LoadingWrapperProps extends PropsWithChildren, React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof loadingVariants> {
  loading: boolean,
  loadingText?: string
}

const LoadingWrapper: FunctionComponent<LoadingWrapperProps> = ({
  children,
  loading,
  loadingText,
  colour,
  positioning,
  opacity,
  className,
  ...props
}): JSX.Element => {

  return (
    <div className="relative h-full">
      <Transition
        show={loading}
        as={Fragment}
        enter="transition ease-in duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition ease-in duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className={loadingVariants(
          { positioning, colour, opacity, className })} {...props}>
          <div className={'grid place-items-center'}>
            <LoadingSpinner size={30}/>
            {loadingText && <SansSerifText size={'normal'} className={'mt-6'}>{loadingText}</SansSerifText>}
          </div>
        </div>
      </Transition>
      {children}
    </div>
  )
}

export default LoadingWrapper