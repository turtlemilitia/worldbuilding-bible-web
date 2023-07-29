import React, {JSX} from "react";
import LoginBox from "../components/LoginBox/LoginBox";

const Login = (): JSX.Element => {
    return (
        <div
            className="flex h-screen w-full items-center justify-center">
            <LoginBox/>
        </div>
    )
}

export default Login;