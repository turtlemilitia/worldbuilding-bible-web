import React, {JSX} from "react";
import Index from "../components/FormBox";
import FormBox from '../components/FormBox'
import LoginForm from '../components/Forms/LoginForm'

const Login = (): JSX.Element => {
    return (
        <div
            className="flex h-screen w-full items-center justify-center">
          <FormBox title={'Login'} subTitle={'Enter Login Details'}>
            <LoginForm/>
          </FormBox>
        </div>
    )
}

export default Login;