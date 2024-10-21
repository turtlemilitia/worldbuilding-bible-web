import React, { FunctionComponent } from 'react'
import BoxWithTitle from '../../components/BoxWithTitle'
import RegisterForm from '../../components/RegisterForm'

const Register: FunctionComponent = () => {
  return (
    <div
      className="flex h-screen w-full items-center justify-center">
      <BoxWithTitle title={'Register'} subTitle={'Please enter your details'}>
        <RegisterForm/>
      </BoxWithTitle>
    </div>
  )
}

export default Register