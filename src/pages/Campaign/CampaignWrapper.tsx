import React, { JSX, useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { useCampaignDataManager, useCompendiumDataManager } from '../../hooks/DataManagers'
import CampaignMenu from '../../components/CampaignWrapper/CampaignMenu'
import { campaignIncludes } from '@/hooks/Forms/useCampaignForm/useCampaignForm'
import { compendiumIncludes } from '@/hooks/Forms/useCompendiumForm/useCompendiumForm'

const CampaignWrapper = (): JSX.Element => {

  const { campaign, view, clearData } = useCampaignDataManager() // redux
  const { compendium, view: viewCompendium, clearData: clearCompendiumData } = useCompendiumDataManager() // redux

  const { campaignId } = useParams() as { campaignId: string; compendiumId?: string } // router

  useEffect(() => {
    if (campaignId !== 'new') {
      view(campaignId, { include: campaignIncludes })
    }
    return () => {
      clearData(campaignId)
    }
  }, [campaignId])

  useEffect(() => {
    if (campaign?.compendium?.slug) {
      viewCompendium(campaign?.compendium?.slug, { include: compendiumIncludes })
    }
    return () => {
      if (compendium) {
        clearCompendiumData(compendium?.slug)
      }
    }
  }, [campaign?.compendium?.slug])

  return (
    <>
      {campaign && (
        <CampaignMenu campaign={campaign}/>
      )}
      <div className="relative w-full">
        {(campaignId === 'new' || campaign) && (
          <Outlet/>
        )}
      </div>
    </>
  )
}

export default CampaignWrapper