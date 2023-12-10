import { FunctionComponent, PropsWithChildren } from 'react'
import { TProps } from './types'

const FloatingBox: FunctionComponent<TProps & PropsWithChildren> = ({ children, width }) => {
  return (
    <div
      className={`text-stone-300 antialiased ${width || ''} rounded-3xl shadow-md shadow-stone-950 border border-opacity-30 border-stone-400 bg-stone-400 bg-opacity-10 px-8 py-6 backdrop-blur-md max-sm:px-8`}>
      {children}
    </div>
  )
}

export default FloatingBox