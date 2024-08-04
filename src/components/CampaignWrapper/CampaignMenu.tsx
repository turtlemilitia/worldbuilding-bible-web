import React, { FunctionComponent, useMemo } from 'react'
import Menu from '../Nav/Menu'
import { TCampaign } from '../../types'
import CampaignMenuItem from './CampaignMenuItem'

type TProps = {
  campaign: TCampaign
}
const CampaignMenu: FunctionComponent<TProps> = ({campaign}) => {

  const menuItems = useMemo(() => [
    {
      title: 'The Campaign',
      to: `/campaigns/${campaign.slug}`
    },
    {
      title: 'Compendium',
      to: `/campaigns/${campaign.slug}/compendia/${campaign.compendium?.slug}`,
      hide: !campaign.compendium
    },
    {
      title: 'Quests',
      to: `/campaigns/${campaign.slug}/quests/${campaign.quests?.[0]?.slug ?? 'new'}`
    },
    {
      title: 'Encounters',
      to: `/campaigns/${campaign.slug}/encounters/${campaign.encounters?.[0]?.slug ?? 'new'}`
    },
    {
      title: 'Sessions',
      to: `/campaigns/${campaign.slug}/sessions/${campaign.sessions?.[0]?.slug ?? 'new'}`
    }
  ], [campaign.slug, campaign.compendium, campaign.quests, campaign.encounters, campaign.sessions])

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

export default CampaignMenu;