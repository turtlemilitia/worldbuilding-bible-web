import React, { FormEvent, JSX, useEffect, useState } from 'react'
import PrimaryButton from './Fields/PrimaryButton'
import { useLocation, useNavigate } from 'react-router-dom'
import PasswordField from './Fields/PasswordField'
import EmailField from './Fields/EmailField'
import { login, LoginParams } from '../../services/AuthService'
import { setToken } from '../../reducers/auth/authSlice'
import { useAppDispatch } from '../../hooks'

const LoginForm = (): JSX.Element => {

  const location = useLocation()
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const [loginData, setLoginData] = useState<LoginParams>({
    email: '',
    password: ''
  })

  const [error, setError] = useState<string | null>(null) // State for holding the error message

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()

    try {
      login(loginData).then(({ data }) => {
        console.log('logged in at server side... setting token...')
        dispatch(setToken(true))
        const redirect = location.state?.redirectTo;
        if (redirect && redirect !== '/login') {
          navigate(location.state.redirectTo, { replace: true })
        } else {
          navigate('/', { replace: true })
        }
      })
    } catch (err) {
      setError('Login failed. Please try again.') // Set the error message in case of login failure
    }
  }

  const handleLoginDataChange = (field: string, value: string) => {
    setLoginData((prevState) => ({ ...prevState, [field]: value }))
  }

  return (
    <form onSubmit={handleLogin}>
      {/* Display the error message if it exists */}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="mb-4">
        <EmailField value={loginData.email} onChange={(value) => handleLoginDataChange('email', value)}/>
      </div>
      <div className="mb-4">
        <PasswordField value={loginData.password}
                       onChange={(value) => handleLoginDataChange('password', value)}/>
      </div>
      <div className="mt-8 flex justify-center">
        <PrimaryButton text={'Login'}/>
      </div>
    </form>
  )
}

export default LoginForm