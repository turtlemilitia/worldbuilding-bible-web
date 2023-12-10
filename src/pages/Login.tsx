import React, {JSX} from "react";
import Index from "../components/BoxWithTitle";
import BoxWithTitle from '../components/BoxWithTitle'
import LoginForm from '../components/Forms/LoginForm'

const Login = (): JSX.Element => {
    return (
        <div
            className="flex h-screen w-full items-center justify-center">
          <BoxWithTitle title={'Login'} subTitle={'Enter Login Details'}>
            <LoginForm/>
          </BoxWithTitle>
        </div>
    )
}

export default Login;