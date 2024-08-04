import React, { JSX, useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import Menu from '../../components/Nav/Menu'
import MenuItem from '../../components/Nav/MenuItem'
import CampaignFavourites from '../../components/CampaignWrapper/CampaignFavourites'
import SmallSansSerifText from '../../components/SmallSansSerifText'
import { useCampaignDataManager } from '../../hooks/DataManagers'

const CampaignsWrapper = (): JSX.Element => {

  const { campaign, view, clearData } = useCampaignDataManager() // redux

  const { campaignId } = useParams() as { campaignId: string } // router

  const isNew = (): boolean => campaignId === 'new'

  useEffect(() => {
    if (!isNew()) {
      view(campaignId, {include: 'compendium;quests;quests.type;quests.parent;encounters;encounters.type;sessions'})
    }
    return () => {
      clearData(campaignId)
    }
  }, [campaignId])

  return (
    <>
      {campaign && (
        <div className="fixed top-20 w-full z-40">
          <Menu>
            {[
              {
                title: 'The Campaign',
                to: `/campaigns/${campaignId}`
              },
              {
                title: 'Compendium',
                to: `/campaigns/${campaignId}/compendia/${campaign.compendium?.slug}`,
                hide: !campaign.compendium
              },
              {
                title: 'Quests',
                to: `/campaigns/${campaignId}/quests/${campaign.quests?.[0]?.slug ?? 'new'}`
              },
              {
                title: 'Encounters',
                to: `/campaigns/${campaignId}/encounters/${campaign.encounters?.[0]?.slug ?? 'new'}`
              },
              {
                title: 'Sessions',
                to: `/campaigns/${campaignId}/sessions/${campaign.sessions?.[0]?.slug ?? 'new'}`
              }
            ].map((menuItem, index) => (
              <SmallSansSerifText key={index}>
                <MenuItem
                  menuItem={menuItem}
                  className="p-4"
                  activeClassName="border border-yellow-500 rounded-full shadow-md shadow-stone-950 bg-stone-400 bg-opacity-10 backdrop-blur-sm"
                />
              </SmallSansSerifText>
            ))}
          </Menu>
        </div>
      )}
      <CampaignFavourites/>
      <div className="relative w-full">
        <Outlet/>
      </div>
    </>
  )
}

export default CampaignsWrapper