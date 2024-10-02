import React, { FunctionComponent, useMemo } from 'react'
import Menu from '../Nav/Menu'
import { TCampaign } from '@/types'
import CampaignMenuItem from './CampaignMenuItem'
import useAuthUserDataManager from '../../hooks/DataManagers/useAuthUserDataManager'
import { MenuItemInterface } from '../Nav/MenuItemInterface'
import SearchCampaign from '@/components/CampaignWrapper/SearchCampaign'

type TProps = {
  campaign: TCampaign
}
const CampaignMenu: FunctionComponent<TProps> = ({ campaign }) => {

  const { user } = useAuthUserDataManager()

  const menuItems = useMemo(() => {
    const items: MenuItemInterface[] = [
      {
        title: 'The Campaign',
        to: `/campaigns/${campaign.slug}`
      }
    ]
    if (user?.id === campaign.gameMaster?.id) {
      items.push(
        {
          title: 'Compendium',
          to: `/campaigns/${campaign.slug}/compendia/${campaign.compendium?.slug}`,
          hide: !campaign.compendium
        },
        {
          title: 'Scenes',
          to: `/campaigns/${campaign.slug}/scenes`
        },
        {
          title: 'Quests',
          to: `/campaigns/${campaign.slug}/quests`
        },
        {
          title: 'Encounters',
          to: `/campaigns/${campaign.slug}/encounters`
        }
      )
    }
    items.push(
      {
        title: 'Sessions',
        to: `/campaigns/${campaign.slug}/sessions`
      }
    )
    return items;
  }, [campaign.slug, campaign.compendium, user?.id, campaign.gameMaster?.id])

  return (
    <div className="fixed top-20 w-full z-50">
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