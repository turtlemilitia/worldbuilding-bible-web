import React, { FunctionComponent, useEffect } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import SceneSidebar from './SceneSidebar'
import { useCurrentCampaign } from '@/hooks/useCurrentCampaign'

const SceneWrapper: FunctionComponent = () => {

  const { campaign } = useCurrentCampaign()

  const { sceneId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {

    if (!campaign?.slug || sceneId || !campaign.scenes) {
      return;
    }
    if (campaign.scenes?.length > 0) {
      navigate(`/campaigns/${campaign.id}/${campaign.slug}/scenes/${campaign.scenes[0]?.id}/${campaign.scenes[0]?.slug}`)
    } else {
      navigate(`/campaigns/${campaign.id}/${campaign.slug}/scenes/new`)
    }

  }, [campaign?.slug])

  return (
    <>
      {campaign && campaign.scenes && (
        <SceneSidebar campaign={campaign}/>
      )}
      <div className="relative w-full h-full">
        <Outlet/>
      </div>
    </>
  )
}

export default SceneWrapper