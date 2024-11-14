import React, { JSX, useState } from 'react'
import LoggedInSidebar from './LoggedInSidebar'
import { useAppSelector } from '@/hooks'
import { RootState } from '@/store'
import { AlignLeftIcon, KeyIcon } from 'lucide-react'
import { clsx } from 'clsx'
import { Link } from 'react-router-dom'

const Nav = (): JSX.Element => {

  const [open, setOpen] = useState<boolean>(false)
  const { token } = useAppSelector((state: RootState) => state.auth) // redux

  return (
    <header>
      {token ? (
        <>
          <div
            className="fixed top-4 left-4 z-[100] text-white cursor-pointer"
            onClick={() => setOpen(prevState => !prevState)}>
            <AlignLeftIcon size={25}/>
          </div>
          {open && (
            <div
              className={clsx([
                'fixed top-0 z-[60]',
                'pt-14 px-5 py-2',
                'flex justify-between h-full w-full md:w-96 items-start',
                'bg-stone-950 text-stone-300',
              ])}>
              <LoggedInSidebar/>
            </div>
          )}
        </>
      ) : (
        <Link
          className="fixed top-4 right-4 z-[100] text-white cursor-pointer"
          to={'/login'}>
          <KeyIcon size={25}/>
        </Link>
      )}
    </header>
  )
}

export default Nav