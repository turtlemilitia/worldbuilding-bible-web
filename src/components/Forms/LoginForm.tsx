import React, { FormEvent, JSX, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PasswordField from './Fields/PasswordField'
import EmailField from './Fields/EmailField'
import { login, LoginParams } from '../../services/AuthService'
import { setToken } from '../../reducers/auth/authSlice'
import { useAppDispatch } from '../../hooks'
import { CheckIcon } from 'lucide-react'
import { indexLocations } from '../../services/LocationService'
import FieldMapper from './Fields/FieldMapper'

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

  const fields: {name: 'email'|'password', label: string, type: string}[] = [
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
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <ul
        className="text-stone-200">
        {fields.map(({name, label, type}) => {
          return <FieldMapper name={name} label={label} type={type} currentValue={loginData[name]} onChange={handleLoginDataChange}/>
        })}
      </ul>
      <div className="mt-8 -mb-16 flex justify-center">
        <button type="submit"
                className="rounded-full border border-yellow-500 shadow-lg shadow-stone-950 bg-emerald-800 hover:bg-emerald-700 px-4 py-4 transition-colors duration-300">
          <CheckIcon size={30}/>
        </button>
      </div>
    </form>
  )
}

export default LoginForm