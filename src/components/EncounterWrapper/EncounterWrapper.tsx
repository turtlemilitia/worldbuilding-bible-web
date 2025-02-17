import React, { FunctionComponent, useEffect } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import EncounterSidebar from './EncounterSidebar'
import { useCurrentCampaign } from '@/hooks/useCurrentCampaign'

const EncounterWrapper: FunctionComponent = () => {

  const { campaign } = useCurrentCampaign()

  const { encounterId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {

    if (!campaign?.id || encounterId || !campaign.encounters) {
      return;
    }
    if (campaign.encounters?.length > 0) {
      navigate(`/campaigns/${campaign.id}/${campaign.slug}/encounters/${campaign.encounters[0]?.id}/${campaign.encounters[0]?.slug}`)
    } else {
      navigate(`/campaigns/${campaign.id}/${campaign.slug}/encounters/new`)
    }

  }, [campaign?.id, campaign?.encounters])

  return (
    <>
      {campaign && campaign.encounters && (
        <EncounterSidebar campaign={campaign}/>
      )}
      <div className="relative w-full h-full">
        <Outlet/>
      </div>
    </>
  )
}

export default EncounterWrapper