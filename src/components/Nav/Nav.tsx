import React, { JSX, useState } from 'react'
import LoggedOutNavBar from './LoggedOutNavBar'
import SideBar from './SideBar'
import LoggedInNavBar from './LoggedInNavBar'
import { useAppSelector } from '../../hooks'
import { RootState } from '../../store'

const Nav = (): JSX.Element => {

  const [open, setOpen] = useState<boolean>(false)
  const { token } = useAppSelector((state: RootState) => state.auth) // redux

  return (
    <header className="relative top-0 w-full">
      {token ? (
        <LoggedInNavBar setSideBarOpen={setOpen}/>
      ) : (
        <LoggedOutNavBar setSideBarOpen={setOpen}/>
      )}
      {open ? ( // todo
        <SideBar open={open} setOpen={setOpen}/>
      ) : ''}
    </header>
  )
}

export default Nav