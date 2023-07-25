import React, { JSX } from 'react'
import { Link } from 'react-router-dom'
import Menu from './Menu'
import { AlignLeft, User2 } from 'lucide-react'

interface NavBarParams {
  setSideBarOpen: (open: boolean) => any;
}

const LoggedOutNavBar = ({ setSideBarOpen }: NavBarParams): JSX.Element => {


  return (
    <div className="flex justify-between bg-stone-950 text-stone-300 px-5 py-2 items-center">
      <div
        className="cursor-pointer"
        onClick={() => setSideBarOpen(true)}>
        <AlignLeft size={25}/>
      </div>
      <Menu/>
      <Link
        className="cursor-pointer"
        to={'/account'}>
        <User2 size={25}/>
      </Link>
    </div>
  )
}

export default LoggedOutNavBar