import React, { FunctionComponent, useMemo } from 'react'
import Menu from '../Nav/Menu'
import { TCampaign } from '../../types'
import CampaignMenuItem from './CampaignMenuItem'
import useAuthUserDataManager from '../../hooks/DataManagers/useAuthUserDataManager'
import { MenuItemInterface } from '../Nav/MenuItemInterface'

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
          to: `/campaigns/${campaign.slug}/scenes/${campaign.scenes?.[0]?.slug ?? 'new'}`
        },
        {
          title: 'Quests',
          to: `/campaigns/${campaign.slug}/quests/${campaign.quests?.[0]?.slug ?? 'new'}`
        },
        {
          title: 'Encounters',
          to: `/campaigns/${campaign.slug}/encounters/${campaign.encounters?.[0]?.slug ?? 'new'}`
        }
      )
    }
    items.push(
      {
        title: 'Sessions',
        to: `/campaigns/${campaign.slug}/sessions/${campaign.sessions?.[0]?.slug ?? 'new'}`
      }
    )
    return items;
  }, [campaign.slug, campaign.compendium, campaign.quests, campaign.encounters, campaign.sessions, user?.id, campaign.gameMaster?.id, campaign.scenes])

  return (
    <div className="fixed top-20 w-full z-40">
      <Menu>
        {menuItems.map((menuItem, index) => (
          <CampaignMenuItem menuItem={menuItem} key={index}/>
        ))}
      </Menu>
    </div>
  )
}

export default CampaignMenu