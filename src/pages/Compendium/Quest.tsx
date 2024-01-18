import React, { FunctionComponent, JSX, useEffect, useState } from 'react'
import { storeQuest, TQuestRequest, updateQuest, viewQuest } from '../../services/QuestService'
import { clearQuestData, setQuestData, updateQuestData } from '../../reducers/compendium/quest/questSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import {
  addCompendiumChildData,
  updateCompendiumChildData
} from '../../reducers/compendium/compendiumSlice'
import { TQuest, TLocationType } from '../../types'
import Post from '../../components/Post/component'
import { TFields } from '../../components/InfoBar'
import { indexSpecies } from '../../services/SpeciesService'

const Quest: FunctionComponent = (): JSX.Element => {

  const { compendium } = useAppSelector((state: RootState) => state.compendium) // redux
  const { quest } = useAppSelector((state: RootState) => state.quest) // redux

  const dispatch = useAppDispatch() // redux

  const { compendiumId, questId } = useParams() as { compendiumId: string; questId: string } // router

  const navigate = useNavigate()

  const isNew: boolean = questId === 'new'

  const readyDataForRequest = (data: any): TQuestRequest => ({
    name: data.name,
    content: data.content,
  })

  const submit = (data: any): Promise<TQuest> => {
    const validated = readyDataForRequest(data)
    if (isNew) {
      return storeQuest(compendiumId, validated)
        .then(({ data }) => {
          dispatch(addCompendiumChildData({ field: 'quests', data: data.data }))
          navigate(`/compendia/${compendiumId}/quests/${data.data.slug}`)
          return data.data
        })
    } else {
      return updateQuest(questId, validated)
        .then(({ data }) => {
          dispatch(updateCompendiumChildData({ field: 'quests', data: data.data }))
          return data.data
        })
    }
  }

  return (
    <Post
      key={questId}
      isNew={isNew}
      ready={true}
      remoteData={quest as TQuest}
      onSave={submit}
      onFetch={() => viewQuest(questId, { include: 'compendium' }).then(({data}) => data.data)}
      fields={[]}
      resetData={() => dispatch(clearQuestData(undefined))}
      setRemoteData={(data) => dispatch(setQuestData(data))}
      requestStructureCallback={readyDataForRequest}
    />
  )
}

export default Quest
