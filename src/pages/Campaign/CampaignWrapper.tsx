import React, { JSX, useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import {
  useCampaignDataManager,
  useCompendiumDataManager,
} from '../../hooks/DataManagers'
import CampaignMenu from '../../components/CampaignWrapper/CampaignMenu'
import { campaignIncludes } from '@/hooks/Forms/useCampaignForm/useCampaignForm'
import {
  compendiumIncludes,
} from '@/hooks/Forms/useCompendiumForm/useCompendiumForm'
import usePostDataManager from '@/hooks/DataManagers/usePostDataManager'

const CampaignWrapper = (): JSX.Element => {

  const { setLoading } = usePostDataManager()
  const { campaign, view, clearData } = useCampaignDataManager() // redux
  const {
    compendium,
    view: viewCompendium,
    clearData: clearCompendiumData,
  } = useCompendiumDataManager() // redux

  const { campaignId } = useParams() as {
    campaignId: string;
    compendiumId?: string
  } // router

  useEffect(() => {
    if (campaignId !== 'new') {
      setLoading({ [campaignId]: true })
      view(campaignId, { include: `${campaignIncludes};images` }).
        then(() => setLoading({ [campaignId]: false }))
    }
    return () => {
      clearData(campaignId)
    }
  }, [campaignId])

  useEffect(() => {
    if (campaign?.compendium?.slug) {
      const compendiumId = campaign?.compendium?.slug
      setLoading({ [compendiumId]: true })
      viewCompendium(compendiumId, { include: compendiumIncludes }).
        then(() => setLoading({ [compendiumId]: false }))
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