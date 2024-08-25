import { FunctionComponent, PropsWithChildren } from 'react'
import clsx from 'clsx'

export type TProps = {
  className?: string;
  hover?: boolean;
}
const SmallFloatingBox: FunctionComponent<TProps & PropsWithChildren> = ({ children, className = '', hover }) => {
  return (
    <div
      className={clsx([
        `inline-block`,
        `rounded-full`,
        `shadow-md shadow-stone-950`,
        `border border-opacity-30 border-stone-400 ${hover && 'hover:border-stone-700'}`,
        `bg-stone-400 bg-opacity-10 backdrop-blur-sm ${hover && 'transition-all duration-500 hover:bg-stone-950 hover:bg-opacity-50'}`,
        `px-2 py-2`,
        `cursor-pointer`,
        className,
      ])}>
      <div className="flex flex-row gap-2 text-xs text-stone-200">
        {children}
      </div>
    </div>
  )
}

export default SmallFloatingBox