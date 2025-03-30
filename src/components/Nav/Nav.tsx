import React, { JSX } from 'react'
import { useAppSelector } from '@/hooks'
import { RootState } from '@/store'
import { HomeIcon, KeyIcon } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/Forms/Fields/Button'

const Nav = (): JSX.Element => {

  const { token } = useAppSelector((state: RootState) => state.auth) // redux

  const location = useLocation();
  const navigate = useNavigate()

  return (
    <header>
      {token && location.pathname !== '/' && (
        <Button
          className="fixed top-3 left-4 z-[100]"
          onClick={() => navigate('/')}
          variant={'ghost'}
          size={'small_icon'}
        >
          <HomeIcon className={'h-5 w-5'}/>
        </Button>
      )}
      {!token && location.pathname !== '/login' && (
        <Button
          className="fixed top-3 left-4 z-[100]"
          onClick={() => navigate('/login')}
          variant={'ghost'}
          size={'small_icon'}
        >
          <KeyIcon className={'h-5 w-5'}/>
        </Button>
      )}
    </header>
  )
}

export default Nav