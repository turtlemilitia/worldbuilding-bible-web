import React, { FunctionComponent, PropsWithChildren } from 'react'
import { clsx } from 'clsx'

const RightBar: FunctionComponent<PropsWithChildren> = ({children}) => {
  return (
    <div className={clsx([
      `fixed z-20 top-0 xl:top-14 right-0 pt-5 w-full xl:w-1/4 h-[calc(100%-7rem)] pb-5 px-6 overflow-x-visible overflow-y-scroll no-scrollbar`,
      'bg-stone-800 xl:bg-transparent'
    ])}>
      {children}
    </div>
  )
}

export default RightBar