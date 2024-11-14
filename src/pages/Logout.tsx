import { FunctionComponent, useEffect } from 'react'
import { logout } from '@/services/AuthService'
import { setToken } from '@/reducers/auth/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Logout: FunctionComponent = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    logout().then(() => {
      console.log('logged out on the server')
      dispatch(setToken(undefined))
      navigate('/', { replace: true })
    })
  }, [])

  return <>
  </>
}

export default Logout