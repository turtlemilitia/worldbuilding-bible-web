import React, { FunctionComponent } from 'react'
import BoxWithTitle from '../../components/BoxWithTitle/BoxWithTitle'
import RegisterForm from '../../components/RegisterForm'
import { RedirectRoute } from '@/routes/RedirectRoute'

const Register: FunctionComponent = () => {
  return (
    <RedirectRoute>
      <div className="flex h-screen w-full items-center justify-center">
        <BoxWithTitle title={'Register'} subTitle={'Please enter your details'}>
          <RegisterForm/>
        </BoxWithTitle>
      </div>
    </RedirectRoute>
  )
}

export default Register