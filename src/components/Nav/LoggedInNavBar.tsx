import React, { JSX } from 'react'
import { Link } from 'react-router-dom'
import HamburgerIcon from '../Icons/HamburgerIcon'
import AccountIcon from '../Icons/AccountIcon'
import { useAuth } from '../../providers/AuthProvider'
import { menuItems } from './MenuItems'
import Menu from './Menu'

interface NavBarParams {
  setSideBarOpen: (open: boolean) => any;
}

const LoggedOutNavBar = ({ setSideBarOpen }: NavBarParams): JSX.Element => {

  const token = useAuth();

  return (
    <div className="flex justify-between px-8 py-5 items-center">
      <div
        className="w-15 h-15 shadow-lg shadow-zinc-900 backdrop-blur-md rounded-full bg-gray-800 bg-opacity-50 py-4 px-4 items-cente cursor-pointer"
        onClick={() => setSideBarOpen(true)}>
        <HamburgerIcon/>
      </div>
      <Menu menuItems={menuItems}/>
      <Link
        className="w-15 h-15 shadow-lg shadow-zinc-900 backdrop-blur-md rounded-full bg-gray-800 bg-opacity-50 py-4 px-4 cursor-pointer text-white"
        to={'/account'}>
        <AccountIcon className="w-5 h-5"/>
      </Link>
    </div>
  )
}

export default LoggedOutNavBar