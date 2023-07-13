import React, {JSX, useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App(): JSX.Element {
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
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24"
               stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
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
        <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
          <div className="text-white">
            <div className="mb-8 flex flex-col items-center">
              <img src="https://www.logo.wine/a/logo/Instagram/Instagram-Glyph-Color-Logo.wine.svg" width="150" alt=""
                   srcSet=""/>
              <h1 className="mb-2 text-2xl">Instagram</h1>
              <span className="text-gray-300">Enter Login Details</span>
            </div>
            <form action="#">
              <div className="mb-4 text-lg">
                <input
                  className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="text" name="name" placeholder="id@email.com"/>
              </div>

              <div className="mb-4 text-lg">
                <input
                  className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="Password" name="name" placeholder="*********"/>
              </div>
              <div className="mt-8 flex justify-center text-lg text-black">
                <button type="submit"
                        className="rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600">Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
