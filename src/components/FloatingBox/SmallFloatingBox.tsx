import { FunctionComponent, PropsWithChildren } from 'react'

export type TProps = {
  className?: string;
}
const SmallFloatingBox: FunctionComponent<TProps & PropsWithChildren> = ({ children, className = '' }) => {
  return (
    <div
      className={`inline-block rounded-full shadow-md shadow-stone-950 border border-opacity-30 border-stone-400 bg-stone-400 bg-opacity-10 px-2 py-2 backdrop-blur-sm cursor-pointer ${className}`}>
      <div className="flex flex-row gap-2 text-xs text-stone-200">
        {children}
      </div>
    </div>
  )
}

export default SmallFloatingBox