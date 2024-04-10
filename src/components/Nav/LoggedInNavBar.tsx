import React, { JSX } from 'react'
import { Link, NavigateFunction, useNavigate } from 'react-router-dom'
import Menu from './Menu'
import { AlignLeftIcon, LogOutIcon, User2Icon } from 'lucide-react'
import { logout } from '../../services/AuthService'
import { setToken } from '../../reducers/auth/authSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { RootState } from '../../store'
import MenuItem from './MenuItem'
import { MenuItemInterface } from './MenuItemInterface'

interface NavBarParams {
  setSideBarOpen: (open: boolean) => any;
}

const LoggedInNavBar = ({ setSideBarOpen }: NavBarParams): JSX.Element => {

  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate()

  const handleLogout = (): void => {
    logout()
      .then(() => {
        console.log('logged out on the server')
        dispatch(setToken(undefined));
        navigate('/', { replace: true })
      })
  }

  const { systems } = useAppSelector((state: RootState) => state.systems) // redux
  const { compendia } = useAppSelector((state: RootState) => state.compendia) // redux
  const { campaigns } = useAppSelector((state: RootState) => state.campaigns) // redux
  const { notebooks } = useAppSelector((state: RootState) => state.notebooks) // redux

  const menuItems: MenuItemInterface[] = [
    {
      title: 'Systems',
      to: '/systems',
      children: [
        ...systems?.map(({ slug, name }) => ({
          title: name,
          to: `/systems/${slug}`
        })) || [],
        {
          title: 'Create new',
          to: '/systems/new',
        }
      ]
    },
    {
      title: 'Compendia',
      to: '/compendia',
      children: [
        ...compendia?.map(({ slug, name }) => ({
          title: name,
          to: `/compendia/${slug}`
        })) || [],
        {
          title: 'Create new',
          to: '/compendia/new',
        }
      ]
    },
    {
      title: 'Campaigns',
      to: '/campaigns',
      children: [
        ...campaigns?.map(({ slug, name }) => ({
          title: name,
          to: `/campaigns/${slug}`
        })) || [],
        {
          title: 'Create new',
          to: '/campaigns/new',
        }
      ]
    },
    {
      title: 'Notes',
      to: '/notebooks',
      children: [
        ...notebooks?.map(({ slug, name }) => ({
          title: name,
          to: `/notebooks/${slug}`
        })) || [],
        {
          title: 'Create new',
          to: '/notebooks/new',
        }
      ]
    }
  ]

  return (
    <div className="flex justify-between bg-stone-950 text-stone-300 px-5 py-2 items-center">
      <div
        className="cursor-pointer"
        onClick={() => setSideBarOpen(true)}>
        <AlignLeftIcon size={25}/>
      </div>
      <Menu>
        {menuItems.map((menuItem, index) => <MenuItem menuItem={menuItem} key={index}/>)}
      </Menu>
      <div className="flex flex-row gap-2">
        <Link
          className="cursor-pointer"
          to={'/account'}>
          <User2Icon size={25}/>
        </Link>
        <button onClick={handleLogout}>
          <LogOutIcon size={25}/>
        </button>
      </div>
    </div>
  )
}

export default LoggedInNavBar