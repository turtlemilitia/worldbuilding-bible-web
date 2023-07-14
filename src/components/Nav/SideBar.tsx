import React, {JSX} from "react";
import cross from "../../assets/hamburger.svg";

interface SideBarParams {
  open: boolean;
  setOpen: Function;
}
const SideBar = ({setOpen}: SideBarParams): JSX.Element => {
  return (
    <div>
      <div className="absolute top-0 w-60 bg-white p-6">
        <div className="flex space-x-6 mb-6">
        <span onClick={() => setOpen(false)} className="p-1">
          <img src={cross} className="w-5" />
        </span>
          <h1>Dashboard</h1>
        </div>
        <ul className="flex flex-col space-y-6 mt-14 border-t py-6">
          <li className="hover:bg-red-500 transition duration-500">Home</li>
          <li className="">Products</li>
          <li className="">About</li>
          <li className="">Contact</li>
          <li className="">Logout</li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;