import React, { FormEvent, JSX, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { login, LoginParams } from '@/services/AuthService'
import { setToken } from '@/reducers/auth/authSlice'
import { useAppDispatch } from '@/hooks'
import FieldMapper from '../Forms/Fields/FieldMapper'
import { ErrorBanner } from '../Banners/ErrorBanner'
import useErrorHandling from '../../hooks/useErrorHandling'
import CheckButton from '../CheckButton'

const LoginForm = (): JSX.Element => {

  const location = useLocation()
  const dispatch = useAppDispatch()

  const [loginData, setLoginData] = useState<LoginParams>({
    email: location.state?.email || '',
    password: ''
  })

  const [loading, setLoading] = useState(false);

  const { errors, handleResponseErrors, hasErrors } = useErrorHandling()

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()

    setLoading(true);

    login(loginData)
      .then(() => {
        console.log('logged in at server side... setting token...')
        dispatch(setToken(true))
      })
      .catch((err) => handleResponseErrors(err, 'Login failed. Please try again.'))
      .finally(() => {
        setLoading(false)
      })
  }

  const handleLoginDataChange = (field: string, value: string) => {
    setLoginData((prevState) => ({ ...prevState, [field]: value }))
  }

  const fields: { name: 'email' | 'password', label: string, type: 'email' | 'password' }[] = [
    {
      name: 'email',
      label: 'Email',
      type: 'email'
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password'
    },
  ]

  return (
    <form onSubmit={handleLogin}>
      {/* Display the error message if it exists */}
      {hasErrors && <ErrorBanner errors={errors}/>}
      <ul
        className="text-stone-200">
        {fields.map((props, index) => {
          return <FieldMapper key={index} currentValue={loginData[props.name]} onChange={handleLoginDataChange} {...props}/>
        })}
      </ul>
      <div className="mt-8 -mb-16 flex justify-center">
        <CheckButton loading={loading}/>
      </div>
    </form>
  )
}

export default LoginForm