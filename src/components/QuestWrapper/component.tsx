import React, { FunctionComponent, useEffect } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import QuestSidebar from './QuestSidebar'
import { useCampaignDataManager } from '../../hooks/DataManagers'
import useQuestTypeIndexDataManager from '../../hooks/DataManagers/Campaigns/useQuestTypeIndexDataManager'

const QuestWrapper: FunctionComponent = () => {

  const { campaign } = useCampaignDataManager()
  const { questTypes } = useQuestTypeIndexDataManager()

  const { questId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {

    if (!campaign?.slug || questId) {
      return
    }
    if (campaign.quests?.length > 0) {
      navigate(`/campaigns/${campaign.slug}/quests/${campaign.quests[0]?.slug}`)
    } else {
      navigate(`/campaigns/${campaign.slug}/quests/new`)
    }

  }, [campaign?.quests])

  return (
    <>
      {campaign && questTypes && (
        <QuestSidebar campaign={campaign}/>
      )}
      <div className="relative w-full">
        <Outlet/>
      </div>
    </>
  )
}

export default QuestWrapper