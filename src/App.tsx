import React, {JSX, useState} from 'react';
import hamburger from './assets/hamburger.svg';
import './App.css';
import LoginBox from "./components/LoginBox/LoginBox";

const App = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  return (
    <div className="App">
      <header className="absolute top-0 w-full">
        <div>
          <div className="flex justify-between bg-red-900 bg-opacity-50 px-16 backdrop-blur-md items-center py-4">
            <div className="flex space-x-4 items-center">
              <div onClick={() => setOpen(!open)}>
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
        {open ? (
          <div>
            <div className="absolute top-0 w-60 bg-white p-6">
              <div className="flex space-x-6 mb-6">
        <span onClick={() => setOpen(!open)}>
          {hamburger}
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
        ) : ''}
      </header>
      <div className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat bg-center"
           style={{backgroundImage: "url('https://images.unsplash.com/photo-1499123785106-343e69e68db1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1748&q=80')"}}>
        <LoginBox/>
      </div>
    </div>
  );
}

export default App;
