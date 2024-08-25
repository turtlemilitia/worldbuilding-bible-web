import React, { FunctionComponent, useEffect } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import SceneSidebar from './SceneSidebar'
import { useCampaignDataManager } from '../../hooks/DataManagers'

const SceneWrapper: FunctionComponent = () => {

  const { campaign } = useCampaignDataManager()

  const { sceneId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {

    if (!campaign?.slug || sceneId) {
      return;
    }
    if (campaign.scenes?.length > 1) {
      navigate(`/campaigns/${campaign.slug}/scenes/${campaign.scenes[0]?.slug}`)
    } else {
      navigate(`/campaigns/${campaign.slug}/scenes/new`)
    }

  }, [campaign?.slug])

  return (
    <>
      {campaign && (
        <SceneSidebar campaign={campaign}/>
      )}
      <div className="relative w-full">
        <Outlet/>
      </div>
    </>
  )
}

export default SceneWrapper