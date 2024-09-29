import React, { FunctionComponent, useEffect } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import EncounterSidebar from './EncounterSidebar'
import { useCampaignDataManager } from '../../hooks/DataManagers'

const EncounterWrapper: FunctionComponent = () => {

  const { campaign } = useCampaignDataManager()

  const { encounterId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {

    if (!campaign?.slug || encounterId) {
      return;
    }
    if (campaign.encounters?.length > 0) {
      navigate(`/campaigns/${campaign.slug}/encounters/${campaign.encounters[0]?.slug}`)
    } else {
      navigate(`/campaigns/${campaign.slug}/encounters/new`)
    }

  }, [campaign?.slug])

  return (
    <>
      {campaign && (
        <EncounterSidebar campaign={campaign}/>
      )}
      <div className="relative w-full">
        <Outlet/>
      </div>
    </>
  )
}

export default EncounterWrapper