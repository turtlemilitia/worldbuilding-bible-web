import React, { JSX, useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { useCampaignDataManager, } from '../../hooks/DataManagers'
import CampaignMenu from '../../components/CampaignWrapper/CampaignMenu'
import { campaignIncludes } from '@/hooks/Forms/useCampaignForm/useCampaignForm'
import usePostDataManager from '@/hooks/DataManagers/usePostDataManager'
import { fixId } from '@/utils/dataUtils'

const CampaignWrapper = (): JSX.Element => {

  const { campaignId, compendiumId } = useParams() as { campaignId: string; compendiumId?: string } // router

  const id = fixId(campaignId);
  const { setLoading } = usePostDataManager()
  const { campaign, view } = useCampaignDataManager(id) // redux

  useEffect(() => {
    if (id) {
      setLoading({ [id]: true })
      view(Number(id), { include: `${campaignIncludes};images` }).
        then(() => setLoading({ [id]: false }))
    }
  }, [id])

  return (
    <>
      {campaign && (
        <CampaignMenu campaign={campaign}/>
      )}
      <div className="relative w-full">
        {(id || campaign) && (
          <Outlet/>
        )}
      </div>
    </>
  )
}

export default CampaignWrapper