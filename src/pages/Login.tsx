import React, { FunctionComponent } from 'react'
import BoxWithTitle from '../components/BoxWithTitle'
import LoginForm from '../components/LoginForm'
import { RedirectRoute } from '@/routes/RedirectRoute'

const Login: FunctionComponent = () => {
  return (
    <RedirectRoute>
      <div className="flex h-screen w-full items-center justify-center">
        <BoxWithTitle title={'Login'} subTitle={'Enter Login Details'}>
          <LoginForm/>
        </BoxWithTitle>
      </div>
    </RedirectRoute>
  )
}

export default Login