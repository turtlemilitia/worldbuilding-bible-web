import React, {JSX} from 'react';
import './App.css';
import AuthProvider from "./providers/AuthProvider";
import Routes from "./routes";

const App = (): JSX.Element => {
  return (
    <AuthProvider>
      <Routes/>
    </AuthProvider>
  );
}

export default App;
