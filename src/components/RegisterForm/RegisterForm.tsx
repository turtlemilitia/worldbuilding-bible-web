import React, { FormEvent, FunctionComponent, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks'
import { register, RegisterParams } from '../../services/AuthService'
import { setToken } from '../../reducers/auth/authSlice'
import FieldMapper from '../Forms/Fields/FieldMapper'
import { TRegisterFormProps } from './types'
import useErrorHandling from '../../hooks/useErrorHandling'
import { ErrorBanner } from '../Banners/ErrorBanner'
import CheckButton from '../CheckButton'

const RegisterForm: FunctionComponent<TRegisterFormProps> = () => {

  const location = useLocation()
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const [registerData, setRegisterData] = useState<RegisterParams>({
    name: '',
    email: location.state?.email || '',
    password: '',
    password_confirmation: ''
  })

  const [loading, setLoading] = useState(false);

  const {errors, handleResponseErrors, hasErrors} = useErrorHandling()

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault()

    setLoading(true);

    register(registerData)
      .then(() => {
        console.log('logged in at server side... setting token...')
        dispatch(setToken(true))
        const redirect = location.state?.redirectTo
        if (redirect && redirect !== '/register') {
          navigate(location.state.redirectTo, { replace: true })
        } else {
          navigate('/', { replace: true })
        }
      })
      .catch((err) => handleResponseErrors(err, 'Registration failed. Please try again.'))
      .finally(() => {
        setLoading(false)
      })
  }

  const handleRegisterDataChange = (field: string, value: string) => {
    setRegisterData((prevState) => ({ ...prevState, [field]: value }))
  }

  const fields: { name: keyof RegisterParams, label: string, type: 'text' | 'email' | 'password' }[] = [
    {
      name: 'name',
      label: 'Name',
      type: 'text'
    }, {
      name: 'email',
      label: 'Email',
      type: 'email'
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password'
    },
    {
      name: 'password_confirmation',
      label: 'Confirm Password',
      type: 'password'
    },
  ]

  return (
    <form onSubmit={handleRegister}>
      {/* Display the error message if it exists */}
      {hasErrors && <ErrorBanner errors={errors}/>}
      <ul
        className="text-stone-200">
        {fields.map((props) => {
          return <FieldMapper currentValue={registerData[props.name]} onChange={handleRegisterDataChange} {...props}/>
        })}
      </ul>
      <div className="mt-8 -mb-16 flex justify-center">
        <CheckButton loading={loading}/>
      </div>
    </form>
  )
}

export default RegisterForm