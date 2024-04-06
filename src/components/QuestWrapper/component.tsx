import React, { createContext, FunctionComponent, useEffect, useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../../hooks'
import { RootState } from '../../store'
import QuestSidebar from './QuestSidebar'
import { TQuestType } from '../../types'
import { indexQuestTypes } from '../../services/QuestTypeService'

export const QuestWrapperContext = createContext<TQuestType[]|undefined>(undefined)

const QuestWrapper: FunctionComponent = () => {

  const { campaign } = useAppSelector((state: RootState) => state.campaign) // redux

  const { questId } = useParams();
  const navigate = useNavigate();

  const [types, setTypes] = useState<TQuestType[]>()

  useEffect(() => {

    if (!campaign?.slug || questId) {
      return;
    }
    if (campaign.quests?.length > 1) {
      navigate(`/campaigns/${campaign.slug}/quests/${campaign.quests[0]?.slug}`)
    } else {
      navigate(`/campaigns/${campaign.slug}/quests/new`)
    }

  }, [campaign?.quests])

  useEffect(() => {

    indexQuestTypes().then(response => setTypes(response.data.data))

  }, [])

  return (
    <QuestWrapperContext.Provider value={types}>
      {campaign && types && (
        <QuestSidebar campaign={campaign}/>
      )}
      <div className="relative w-full">
        <Outlet/>
      </div>
    </QuestWrapperContext.Provider>
  )
}

export default QuestWrapper