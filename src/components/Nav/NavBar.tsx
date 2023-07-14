import React, {JSX} from "react";

interface NavBarParams {
  setSideBarOpen: (open: boolean) => any;
}
const NavBar = ({setSideBarOpen}: NavBarParams): JSX.Element => {
  return (
    <div>
      <div className="flex justify-between bg-red-900 bg-opacity-50 px-16 backdrop-blur-md items-center py-4">
        <div className="flex space-x-4 items-center">
          <div onClick={() => setSideBarOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 cursor-pointer text-white" fill="none"
                 viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16"/>
            </svg>
          </div>
          <h1 className="text-white font-bold text-xl tracking-wide cursor-pointer">D&D Tracker</h1>
        </div>
        <ul className="flex space-x-6">
          <li className="text-white text-lg font-semibold tracking-normal cursor-pointer">Home</li>
          <li className="text-white text-lg font-semibold tracking-normal cursor-pointer">About</li>
          <li className="text-white text-lg font-semibold tracking-normal cursor-pointer">Contact</li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;