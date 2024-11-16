import React, { JSX } from 'react'
import LoggedInSidebar from './LoggedInSidebar'
import { useAppSelector } from '@/hooks'
import { RootState } from '@/store'
import { KeyIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

const Nav = (): JSX.Element => {

  const { token } = useAppSelector((state: RootState) => state.auth) // redux

  return (
    <header>
      {token ? (
        <LoggedInSidebar/>
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