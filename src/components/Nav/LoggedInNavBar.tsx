import React, { JSX, useMemo } from 'react'
import { Link, NavigateFunction, useNavigate } from 'react-router-dom'
import Menu from './Menu'
import { AlignLeftIcon, LogOutIcon, User2Icon } from 'lucide-react'
import { logout } from '@/services/AuthService'
import { setToken } from '@/reducers/auth/authSlice'
import { useAppDispatch } from '@/hooks'
import MenuItem from './MenuItem'
import { MenuItemInterface } from './MenuItemInterface'
import {
  useCampaignIndexDataManager,
  useCompendiumIndexDataManager,
  useSystemIndexDataManager,
} from '../../hooks/DataManagers'
import useAuthUserDataManager from '@/hooks/DataManagers/useAuthUserDataManager'
import isEmpty from '@/utils/isEmpty'

interface NavBarParams {
  setSideBarOpen: (open: boolean) => any;
}

const LoggedInNavBar = ({ setSideBarOpen }: NavBarParams): JSX.Element => {

  const dispatch = useAppDispatch()
  const navigate: NavigateFunction = useNavigate()

  const handleLogout = (): void => {
    logout().then(() => {
      console.log('logged out on the server')
      dispatch(setToken(undefined))
      navigate('/', { replace: true })
    })
  }

  const { user } = useAuthUserDataManager()
  const { systems } = useSystemIndexDataManager()
  const { compendia } = useCompendiumIndexDataManager()
  const { campaigns } = useCampaignIndexDataManager()

  const canCreateNewSystems = useMemo(() => {
    return user?.permissions?.some(({ permission, permissionableType }) => {
      return permission === 'create' && permissionableType === 'system'
    })
  }, [user?.permissions])
  const canCreateNewCompendia = useMemo(() => {
    return user?.permissions?.some(({ permission, permissionableType }) => {
      return permission === 'create' && permissionableType === 'compendium'
    })
  }, [user?.permissions])
  const canCreateNewCampaigns = useMemo(() => {
    return user?.permissions?.some(({ permission, permissionableType }) => {
      return permission === 'create' && permissionableType === 'campaign'
    })
  }, [user?.permissions])

  const menuItems: MenuItemInterface[] = useMemo(() => {
    const menuItems = []
    if (!isEmpty(systems) || canCreateNewSystems) {
      menuItems.push({
        title: 'Systems',
        to: '/systems',
        children: [
          ...systems?.map(({ slug, name }) => ({
            title: name,
            to: `/systems/${slug}`,
          })) || [],
          ...(canCreateNewSystems ? [
            {
              title: 'Create new',
              to: '/systems/new',
            }] : []),
        ],
      })
    }
    if (!isEmpty(compendia) || canCreateNewCompendia) {
      menuItems.push({
        title: 'Compendia',
        to: '/compendia',
        children: [
          ...compendia?.map(({ slug, name }) => ({
            title: name,
            to: `/compendia/${slug}`,
          })) || [],
          ...(canCreateNewCompendia ? [
            {
              title: 'Create new',
              to: '/compendia/new',
            }] : []),
        ],
      })
    }
    if (!isEmpty(campaigns) || canCreateNewCampaigns) {
      menuItems.push({
        title: 'Campaigns',
        to: '/campaigns',
        children: [
          ...campaigns?.map(({ slug, name }) => ({
            title: name,
            to: `/campaigns/${slug}`,
          })) || [],
          ...(canCreateNewCampaigns ? [
            {
              title: 'Create new',
              to: '/campaigns/new',
            }] : []),
        ],
      })
    }
    menuItems.push({
      title: 'Notes',
      to: '/notes',
    }, {
      title: 'Markdown Help',
      to: '/markdown-example'
    })
    return menuItems
  }, [
    systems,
    canCreateNewSystems,
    compendia,
    canCreateNewCompendia,
    campaigns,
    canCreateNewCampaigns,
  ])

  return (
    <div
      className="flex justify-between bg-stone-950 text-stone-300 px-5 py-2 items-center">
      <div
        className="cursor-pointer"
        onClick={() => setSideBarOpen(true)}>
        <AlignLeftIcon size={25}/>
      </div>
      <Menu>
        {menuItems.map(
          (menuItem, index) => <MenuItem menuItem={menuItem} key={index}/>)}
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