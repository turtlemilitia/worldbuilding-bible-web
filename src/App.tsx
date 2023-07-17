import React, {JSX} from 'react';
import './App.css';
import Nav from "./components/Nav/Nav";
import bg2 from "./assets/images/landingBackground.jpg";
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
