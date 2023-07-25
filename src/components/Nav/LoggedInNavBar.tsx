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
    <div className="flex justify-between bg-gray-900 text-gray-300 px-5 py-2 items-center">
      <div
        className="cursor-pointer"
        onClick={() => setSideBarOpen(true)}>
        <HamburgerIcon/>
      </div>
      <Menu menuItems={menuItems}/>
      <Link
        className="cursor-pointer"
        to={'/account'}>
        <AccountIcon className="w-5 h-5"/>
      </Link>
    </div>
  )
}

export default LoggedOutNavBar