import React, { JSX, useMemo, useState } from 'react'
import {
  useCampaignIndexDataManager,
  useCompendiumIndexDataManager,
  useSystemIndexDataManager,
} from '../../hooks/DataManagers'
import useAuthUserDataManager from '@/hooks/DataManagers/useAuthUserDataManager'
import isEmpty from '@/utils/isEmpty'
import SidebarSection from '@/components/Sidebar/SidebarSection'
import { SidebarItemInterface } from '@/components/Sidebar/Sidebar'
import { AlignLeftIcon } from 'lucide-react'
import { clsx } from 'clsx'

const LoggedInSidebar = (): JSX.Element => {

  const { user } = useAuthUserDataManager()
  const { systems } = useSystemIndexDataManager()
  const { compendia } = useCompendiumIndexDataManager()
  const { campaigns } = useCampaignIndexDataManager()

  const [open, setOpen] = useState<boolean>(false)

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
          ...systems?.map(({ id, slug, name }) => ({
            title: name,
            to: `/systems/${id}/${slug}`,
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
          ...compendia?.map(({ id, slug, name }) => ({
            title: name,
            to: `/compendia/${id}/${slug}`,
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
          ...campaigns?.map(({ id, slug, name }) => ({
            title: name,
            to: `/campaigns/${id}/${slug}`,
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
      to: '/logout',
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
    <>
      <div
        className="fixed top-4 left-4 z-[100] text-white cursor-pointer"
        onClick={() => setOpen(prevState => !prevState)}>
        <AlignLeftIcon className={'w-6 h-6'}/>
      </div>
      <div
        className={clsx([
          'fixed top-0 z-[60]',
          'pt-14 px-5 py-2',
          'flex justify-between h-full w-full md:w-96 items-start',
          'bg-stone-950 text-stone-300',
          "transition-all duration-500",
          open ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0",
          "border-r border-r-amber-500"
        ])}>
        <div className={'relative flex w-full'}>
          <SidebarSection
            items={menuItems}
          />
        </div>
      </div>
    </>
  )
}

export default LoggedInSidebar