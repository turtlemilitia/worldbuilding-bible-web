import React, { FunctionComponent, PropsWithChildren, useState } from 'react'
import { clsx } from 'clsx'
import { ChevronLeftIcon } from 'lucide-react'

const RightBar: FunctionComponent<PropsWithChildren> = ({ children }) => {

  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <button
        className="fixed top-4 right-4 z-[110] text-white cursor-pointer lg:hidden"
        onClick={() => setOpen(prevState => !prevState)}>
        <ChevronLeftIcon className={'h-6 w-6'}/>
      </button>
      <div className={clsx([
        'fixed z-20 top-0 right-0 w-full lg:w-1/3 xl:w-1/4 h-full',
        'overflow-x-visible overflow-y-scroll no-scrollbar',
        'pb-5 px-6 pt-24 lg:pt-14',
        'transition-all duration-500',
        open ? 'translate-x-0' : 'translate-x-full',
        'lg:translate-x-0',
        'bg-stone-800 bg-opacity-80 lg:bg-transparent',
        'border-l border-l-stone-700 lg:border-l-0'
      ])}>
        {children}
      </div>
    </>
  )
}

export default RightBar