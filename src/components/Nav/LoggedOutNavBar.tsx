import React, { JSX } from 'react'
import { Link } from 'react-router-dom'
import LoginIcon from '../Icons/LoginIcon'
import HamburgerIcon from '../Icons/HamburgerIcon'

interface NavBarParams {
  setSideBarOpen: (open: boolean) => any;
}

const LoggedOutNavBar = ({ setSideBarOpen }: NavBarParams): JSX.Element => {

  return (
    <div className="flex justify-between px-8 py-5 items-center">
      <div
        className="w-15 h-15 shadow-lg shadow-zinc-900 backdrop-blur-md rounded-full bg-gray-800 bg-opacity-50 py-4 px-4 items-cente cursor-pointer"
        onClick={() => setSideBarOpen(true)}>
        <HamburgerIcon/>
      </div>
      <Link
        className="w-15 h-15 shadow-lg backdrop-blur-md rounded-full bg-gray-800 bg-opacity-50 py-4 px-4 cursor-pointer text-white"
        to={'/login'}>
        <LoginIcon size={5}/>
      </Link>
    </div>
  )

};

export default LoggedOutNavBar;