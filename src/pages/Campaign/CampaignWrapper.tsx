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
    if (campaign?.compendium?.slug) {
      const compendiumId = campaign?.compendium?.id
      setLoading({ [compendiumId]: true })
      viewCompendium(compendiumId, { include: compendiumIncludes }).
      then(() => setLoading({ [compendiumId]: false }))
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