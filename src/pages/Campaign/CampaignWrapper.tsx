import React, { JSX, useEffect, useMemo } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { useCampaignDataManager, } from '../../hooks/DataManagers'
import CampaignMenu from '../../components/CampaignWrapper/CampaignMenu'
import { campaignIncludes } from '@/hooks/Forms/useCampaignForm/useCampaignForm'
import {
  compendiumIncludes,
} from '@/hooks/Forms/useCompendiumForm/useCompendiumForm'
import usePostDataManager from '@/hooks/DataManagers/usePostDataManager'
import { fixId } from '@/utils/dataUtils'
import { useCompendiumDataManager } from '@/hooks/DataManagers'

const CampaignWrapper = (): JSX.Element => {

  const { campaignId, compendiumId } = useParams() as { campaignId: string; compendiumId?: string } // router

  const id = useMemo(() => fixId(campaignId), [campaignId]);
  const { setLoading, isLoading, isLoaded } = usePostDataManager()
  const { campaign, view } = useCampaignDataManager(id) // redux
  const {
    compendium,
    view: viewCompendium,
  } = useCompendiumDataManager() // redux

  useEffect(() => {
    if (id && !isLoading(`campaign:${id}`) && !isLoaded(`campaign:${id}`)) {
      setLoading({ [`campaign:${id}`]: true })
      view(Number(id), { include: `${campaignIncludes};images` }).
        then(() => {
          setLoading({ [`campaign:${id}`]: false })
        })
    }
  }, [id])

  useEffect(() => {
    if (campaign?.compendium?.id && !isLoading(`compendium:${campaign?.compendium?.id}`) && !isLoaded(`compendium:${campaign?.compendium?.id}`)) { // if it's been loaded as part of the campaign
      setLoading({ [`compendium:${campaign?.compendium?.id}`]: true })
      viewCompendium(campaign?.compendium?.id, { include: `${compendiumIncludes};images` })
        .then(() => setLoading({ [`compendium:${campaign?.compendium?.id}`]: false }))
    }
  }, [campaign?.compendium?.id])

  return (
    <>
      {isLoaded(`campaign:${id}`) && campaign && (
        <CampaignMenu campaign={campaign}/>
      )}
      <div className="relative w-full h-[calc(100%-35px)]">
        {isLoaded(`campaign:${id}`) && (
          <Outlet/>
        )}
      </div>
    </>
  )
}

export default CampaignWrapper