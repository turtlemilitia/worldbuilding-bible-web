import React, { JSX, useMemo } from 'react'
import {
  useCampaignIndexDataManager,
  useCompendiumIndexDataManager,
  useSystemIndexDataManager,
} from '../../hooks/DataManagers'
import useAuthUserDataManager from '@/hooks/DataManagers/useAuthUserDataManager'
import isEmpty from '@/utils/isEmpty'
import SidebarSection from '@/components/Sidebar/SidebarSection'
import { SidebarItemInterface } from '@/components/Sidebar/Sidebar'

const LoggedInSidebar = (): JSX.Element => {

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

  const menuItems: SidebarItemInterface[] = useMemo(() => {
    const menuItems: SidebarItemInterface[] = []
    if (!isEmpty(systems) || canCreateNewSystems) {
      menuItems.push({
        title: 'Systems',
        to: '/systems',
        startOpen: true,
        addNewLink: canCreateNewSystems ? '/systems/new' : undefined,
        children: [
          ...systems?.map(({ slug, name }) => ({
            title: name,
            to: `/systems/${slug}`,
          })) || [],
        ],
      })
    }
    if (!isEmpty(compendia) || canCreateNewCompendia) {
      menuItems.push({
        title: 'Compendia',
        to: '/compendia',
        startOpen: true,
        addNewLink: canCreateNewCompendia ? '/compendia/new' : undefined,
        children: [
          ...compendia?.map(({ slug, name }) => ({
            title: name,
            to: `/compendia/${slug}`,
          })) || [],
        ],
      })
    }
    if (!isEmpty(campaigns) || canCreateNewCampaigns) {
      menuItems.push({
        title: 'Campaigns',
        to: '/campaigns',
        startOpen: true,
        addNewLink: canCreateNewCampaigns ? '/campaigns/new' : undefined,
        children: [
          ...campaigns?.map(({ slug, name }) => ({
            title: name,
            to: `/campaigns/${slug}`,
          })) || [],
        ],
      })
    }
    menuItems.push({
      title: 'Notes',
      to: '/notes',
    }, {
      title: 'Markdown Help',
      to: '/markdown-example',
    }, {
      title: 'Logout',
      to: '/logout'
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
    <div className={'relative flex w-full'}>
      <SidebarSection
        items={menuItems}
      />
    </div>
  )
}

export default LoggedInSidebar