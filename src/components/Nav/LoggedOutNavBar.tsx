import React, { JSX } from 'react'
import { Link } from 'react-router-dom'
import { AlignLeft, Key as KeyIcon } from 'lucide-react'

interface NavBarParams {
  setSideBarOpen: (open: boolean) => any;
}

const LoggedOutNavBar = ({ setSideBarOpen }: NavBarParams): JSX.Element => {

  return (
    <div className="flex justify-between px-8 py-5 items-center">
      <div
        className="w-15 h-15 shadow-lg shadow-stone-900 backdrop-blur-md rounded-full bg-stone-800 bg-opacity-50 py-4 px-4 items-cente cursor-pointer"
        onClick={() => setSideBarOpen(true)}>
        <AlignLeft size={25}/>
      </div>
      <Link
        className="w-15 h-15 shadow-lg backdrop-blur-md rounded-full bg-stone-800 bg-opacity-50 py-4 px-4 cursor-pointer text-white"
        to={'/login'}>
        <KeyIcon size={25}/>
      </Link>
    </div>
  )

};

export default LoggedOutNavBar;