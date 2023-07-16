import React, {JSX} from 'react';
import './App.css';
import Nav from "./components/Nav/Nav";
import bg2 from "./assets/images/landingBackground.jpg";
import AuthProvider from "./providers/AuthProvider";
import Routes from "./routes";

const App = (): JSX.Element => {
    return (
        <AuthProvider>
            <div
                className="font-serif flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat bg-center"
                style={{backgroundImage: `url(${bg2})`}}>
                <Nav/>
                <Routes/>
            </div>
        </AuthProvider>
    );
}

export default App;
