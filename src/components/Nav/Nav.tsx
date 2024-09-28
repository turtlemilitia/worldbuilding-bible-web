import React, { JSX, useState } from 'react'
import LoggedOutNavBar from './LoggedOutNavBar'
import LoggedInNavBar from './LoggedInNavBar'
import { useAppSelector } from '../../hooks'
import { RootState } from '../../store'

const Nav = (): JSX.Element => {

  const [open, setOpen] = useState<boolean>(false) // todo is there a sidebar?
  const { token } = useAppSelector((state: RootState) => state.auth) // redux

  return (
    <header className="fixed top-0 w-full z-[60]">
      {token ? (
        <LoggedInNavBar setSideBarOpen={setOpen}/>
      ) : (
        <LoggedOutNavBar setSideBarOpen={setOpen}/>
      )}
    </header>
  )
}

export default Nav