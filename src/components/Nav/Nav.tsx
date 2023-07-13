import React, {JSX, useState} from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

const Nav = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  return (
    <header className="absolute top-0 w-full">
      <NavBar open={open} setSideBarOpen={setOpen}/>
      {open ? (
        <SideBar open={open} setOpen={setOpen}/>
      ) : ''}
    </header>
  )
};

export default Nav;