import React, { FunctionComponent, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import QuestSidebar from './QuestSidebar'
import useQuestTypeIndexDataManager from '../../hooks/DataManagers/Campaigns/useQuestTypeIndexDataManager'
import usePostDataManager from '@/hooks/DataManagers/usePostDataManager'
import bgImage from '@/assets/images/quests.png'
import { useCurrentCampaign } from '@/hooks/useCurrentCampaign'

const QuestWrapper: FunctionComponent = () => {

  const { campaign } = useCurrentCampaign()
  const { questTypes } = useQuestTypeIndexDataManager()

  const { setDefaultBackgroundImage, clearDefaultBackgroundImage } = usePostDataManager()

  useEffect(() => {
    setDefaultBackgroundImage(bgImage)

    return () => {
      clearDefaultBackgroundImage()
    }
  }, [])

  return (
    <>
      {campaign && campaign.quests && questTypes && (
        <QuestSidebar campaign={campaign}/>
      )}
      <div className="relative w-full">
        <Outlet/>
      </div>
    </>
  )
}

export default QuestWrapper