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
        title: 'The Campaign',
        to: `/campaigns/${campaign.slug}`,
      },
    ]
    if (campaign.compendium) {
      items.push({
        title: 'Compendium',
        to: `/campaigns/${campaign.slug}/compendia/${campaign.compendium?.slug}`,
        hide: !campaign.compendium,
      })
    }
    if (isGamemaster || campaign.scenes.length > 0) {
      items.push({
        title: 'Scenes',
        to: `/campaigns/${campaign.slug}/scenes`,
      })
    }

    if (isGamemaster || campaign.quests.length > 0) {
      items.push({
        title: 'Quests',
        to: `/campaigns/${campaign.slug}/quests`,
      })
    }

    if (isGamemaster || campaign.encounters.length > 0) {
      items.push({
        title: 'Encounters',
        to: `/campaigns/${campaign.slug}/encounters`,
      })
    }
    if (isGamemaster || campaign.sessions.length > 0) {
      items.push({
        title: 'Sessions',
        to: `/campaigns/${campaign.slug}/sessions`,
      })
    }
    items.push({
      title: 'Notes',
      to: `/campaigns/${campaign.slug}/notes`,
    })
    return items
  }, [
    campaign.slug,
    campaign.compendium,
    isGamemaster,
    campaign.scenes.length,
    campaign.quests.length,
    campaign.encounters.length,
    campaign.sessions.length
  ])

  return (
    <div className={clsx([
      "relative z-50 top-14 w-full",
      "md:top-3 md:w-[calc(100%-12rem)]",
      "mx-auto",
      "overflow-x-scroll no-scrollbar"
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