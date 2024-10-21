import React, { FunctionComponent, useEffect } from 'react'
import { useAppSelector } from '@/hooks'
import { RootState } from '@/store'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

export const RedirectRoute: FunctionComponent = () => {

  const { token: isLoggedIn } = useAppSelector((state: RootState) => state.auth)

  const location = useLocation()
  const navigate = useNavigate()

  // Here we will be adding the missing items where needed
  useEffect(() => {
    if (isLoggedIn) {
      const redirect = location.state?.redirectTo
      if (redirect && redirect !== location.pathname) {
        navigate(location.state.redirectTo, { replace: true })
      } else {
        navigate('/', { replace: true })
      }
    }
  }, [isLoggedIn])

  // If authenticated, render the child routes
  return (
    <Outlet/>
  )
}