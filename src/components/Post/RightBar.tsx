import React, { FunctionComponent, PropsWithChildren, useState } from 'react'
import { clsx } from 'clsx'
import { ChevronLeftIcon } from 'lucide-react'

const RightBar: FunctionComponent<PropsWithChildren> = ({ children }) => {

  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <button
        className="fixed top-4 right-4 z-[110] text-white cursor-pointer xl:hidden"
        onClick={() => setOpen(prevState => !prevState)}>
        <ChevronLeftIcon size={25}/>
      </button>
      <div className={clsx([
        'fixed z-20 top-0 right-0 w-full xl:w-1/3 2xl:w-1/4 h-full',
        'overflow-x-visible overflow-y-scroll no-scrollbar',
        'pb-5 px-6 pt-24 xl:pt-14',
        'transition-all duration-500',
        open ? 'translate-x-0' : 'translate-x-full',
        'xl:translate-x-0',
        'bg-stone-800 bg-opacity-80 xl:bg-transparent',
        'border-l border-l-stone-700 xl:border-l-0'
      ])}>
        {children}
      </div>
    </>
  )
}

export default RightBar