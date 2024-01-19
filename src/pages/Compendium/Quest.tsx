import React, { FunctionComponent, JSX, useEffect, useState } from 'react'
import { storeQuest, TQuestRequest, updateQuest, viewQuest } from '../../services/QuestService'
import { clearQuestData, setQuestData, updateQuestData } from '../../reducers/compendium/quest/questSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useParams } from 'react-router-dom'
import { RootState } from '../../store'
import {
  addCompendiumChildData,
  updateCompendiumChildData
} from '../../reducers/compendium/compendiumSlice'
import { TQuest } from '../../types'
import Post from '../../components/Post'

const Quest: FunctionComponent = (): JSX.Element => {

  const { quest } = useAppSelector((state: RootState) => state.quest) // redux

  const dispatch = useAppDispatch() // redux

  const { compendiumId, questId } = useParams() as { compendiumId: string; questId: string } // router

  const readyDataForRequest = (data: any): TQuestRequest => ({
    name: data.name,
    content: data.content,
  })

  return (
    <Post
      key={questId}
      isNew={questId === 'new'}
      pathToNew={(data) => `/compendia/${compendiumId}/quests/${data.slug}`}
      ready={true}

      onCreate={(data: TQuestRequest) => storeQuest(compendiumId, data).then(({ data }) => data.data)}
      onUpdate={(data: TQuestRequest) => updateQuest(questId, data).then(({ data }) => data.data)}
      onCreated={(data) => {
        dispatch(addCompendiumChildData({ field: 'quests', data: data }))
      }}
      onUpdated={(data) => {
        dispatch(updateCompendiumChildData({ field: 'quests', data: data }))
      }}
      onFetch={() => viewQuest(questId).then(({ data }) => data.data)}
      requestStructureCallback={readyDataForRequest}

      fields={[]}

      persistedData={quest as TQuest}
      setPersistedData={(data) => dispatch(setQuestData(data))}
      updatePersistedData={(data) => dispatch(updateQuestData(data))}
      resetPersistedData={() => dispatch(clearQuestData(undefined))}
    />
  )
}

export default Quest
