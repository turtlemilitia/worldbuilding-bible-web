import React, { JSX, useState } from 'react'
import LoggedOutNavBar from './LoggedOutNavBar'
import SideBar from './SideBar'
import { useAuth } from '../../providers/AuthProvider'
import LoggedInNavBar from './LoggedInNavBar'

const Nav = (): JSX.Element => {

  const [open, setOpen] = useState<boolean>(false)
  const { token } = useAuth()

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