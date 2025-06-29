import React, { FunctionComponent, useMemo } from 'react'
import Menu from '../Nav/Menu'
import { TCampaign } from '@/types'
import CampaignMenuItem from './CampaignMenuItem'
import useAuthUserDataManager
  from '../../hooks/DataManagers/useAuthUserDataManager'
import { MenuItemInterface } from '../Nav/MenuItemInterface'
import SearchCampaign from '@/components/CampaignWrapper/SearchCampaign'
import { clsx } from 'clsx'

type TProps = {
  campaign: TCampaign
}
const CampaignMenu: FunctionComponent<TProps> = ({ campaign }) => {

  const { user } = useAuthUserDataManager()

  const isGamemaster = useMemo(() => {
    return user?.id === campaign.gameMaster?.id
  }, [user?.id, campaign.gameMaster?.id])

  const menuItems = useMemo(() => {
    const items: MenuItemInterface[] = [
      {
        title: 'Campaign',
        to: `/campaigns/${campaign.id}/${campaign.slug}`,
      },
    ]
    if (campaign.compendium) {
      items.push({
        title: 'Compendium',
        to: `/campaigns/${campaign.id}/${campaign.slug}/compendia/${campaign.compendium?.id}/${campaign.compendium?.slug}`,
        hide: !campaign.compendium,
      })
    }
    // if (isGamemaster || (campaign.scenes && campaign.scenes.length > 0)) {
    //   items.push({
    //     title: 'Scenes',
    //     to: `/campaigns/${campaign.id}/${campaign.slug}/scenes`,
    //   })
    // }

    if (isGamemaster || (campaign.quests && campaign.quests.length > 0)) {
      items.push({
        title: 'Quests',
        to: `/campaigns/${campaign.id}/${campaign.slug}/quests`,
      })
    }

    if (isGamemaster || (campaign.encounters && campaign.encounters.length > 0)) {
      items.push({
        title: 'Encounters & Scenes',
        to: `/campaigns/${campaign.id}/${campaign.slug}/encounters`,
      })
    }
    if (isGamemaster || (campaign.sessions && campaign.sessions.length > 0)) {
      items.push({
        title: 'Sessions',
        to: `/campaigns/${campaign.id}/${campaign.slug}/sessions`,
      })
    }
    items.push({
      title: 'Notes',
      to: `/campaigns/${campaign.id}/${campaign.slug}/notes`,
    })
    return items
  }, [
    campaign.id,
    campaign.slug,
    campaign.compendium,
    isGamemaster,
    campaign.scenes,
    campaign.quests,
    campaign.encounters,
    campaign.sessions,
  ])

  return (
    <div className={clsx([
      "relative z-50 top-14 w-full",
      "md:top-3 md:w-[calc(100%-12rem)]",
      "mx-auto",
      "h-10 overflow-y-hidden overflow-x-scroll no-scrollbar"
    ])}>
      <Menu>
        {menuItems.map((menuItem, index) => (
          <CampaignMenuItem menuItem={menuItem} key={index}/>
        ))}
        <SearchCampaign/>
      </Menu>
    </div>
  )
}

export default CampaignMenu