import React, { JSX, useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { useCampaignDataManager } from '../../hooks/DataManagers'
import CampaignMenu from '../../components/CampaignWrapper/CampaignMenu'

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
        <CampaignMenu campaign={campaign}/>
      )}
      <div className="relative w-full">
        <Outlet/>
      </div>
    </>
  )
}

export default CampaignsWrapper