import React, {JSX} from 'react';
import './App.css';
import LoginBox from "./components/LoginBox/LoginBox";
import Nav from "./components/Nav/Nav";

const App = (): JSX.Element => {
  return (
    <div className="App font-sans-serif">
      <Nav/>
      <div className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat bg-center"
           style={{backgroundImage: "url('https://images.unsplash.com/photo-1499123785106-343e69e68db1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1748&q=80')"}}>
        <LoginBox/>
      </div>
    </div>
  );
}

export default App;
