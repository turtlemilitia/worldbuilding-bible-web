import React, { FunctionComponent } from 'react'
import BoxWithTitle from '../components/BoxWithTitle'
import LoginForm from '../components/LoginForm'

const Login: FunctionComponent = () => {
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