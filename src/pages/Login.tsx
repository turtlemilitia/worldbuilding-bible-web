import React, {JSX} from "react";
import LoginBox from "../components/LoginBox/LoginBox";
import {useAuth} from "../providers/AuthProvider";
import {useNavigate} from "react-router-dom";

const Login = (): JSX.Element => {
    return (
        <div
            className="flex h-screen w-full items-center justify-center">
            <LoginBox/>
        </div>
    )
}

export default Login;