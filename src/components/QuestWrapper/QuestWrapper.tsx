import React, { FunctionComponent, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import QuestSidebar from './QuestSidebar'
import { useCampaignDataManager } from '../../hooks/DataManagers'
import useQuestTypeIndexDataManager from '../../hooks/DataManagers/Campaigns/useQuestTypeIndexDataManager'
import usePostDataManager from '@/hooks/DataManagers/usePostDataManager'
import bgImage from '@/assets/images/quests.png'

const QuestWrapper: FunctionComponent = () => {

  const { campaign } = useCampaignDataManager()
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