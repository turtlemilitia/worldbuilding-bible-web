import React, { FunctionComponent, JSX, useContext, useEffect, useState } from 'react'
import { destroyQuest, storeQuest, TQuestRequest, updateQuest, viewQuest } from '../../../services/QuestService'
import { clearQuestData, setQuestData, updateQuestData } from '../../../reducers/campaign/quest/questSlice'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { useLocation, useParams } from 'react-router-dom'
import { RootState } from '../../../store'
import {
  addCampaignChildData,
  removeCampaignChildData,
  updateCampaignChildData
} from '../../../reducers/campaign/campaignSlice'
import { TQuest } from '../../../types'
import Post from '../../../components/Post'
import { QuestWrapperContext } from '../../../components/QuestWrapper/component'

const include = 'type'

const Quest: FunctionComponent = (): JSX.Element => {

  const { quest } = useAppSelector((state: RootState) => state.quest) // redux

  const dispatch = useAppDispatch() // redux

  const { state: locationState } = useLocation()

  const { campaignId, questId } = useParams() as { campaignId: string; questId: string } // router

  const [ready, setReady] = useState<boolean>(false)

  const types = useContext(QuestWrapperContext);

  useEffect(() => {

    if (types !== undefined) {
      setReady(true)
    }

  }, [types])

  const readyDataForRequest = (data: any): TQuestRequest => ({
    name: data.name,
    content: data.content,
    typeId: data.type.id,
  })

  return (
    <Post
      key={questId}
      isNew={questId === 'new'}
      pathToNew={(data) => `/campaigns/${campaignId}/quests/${data.slug}`}
      pathAfterDelete={`/campaigns/${campaignId}`}
      pageTypeName={'Quest'}
      ready={ready}

      onFetch={() => viewQuest(questId, { include }).then(({ data }) => data.data)}
      onCreate={(data: TQuestRequest) => storeQuest(campaignId, readyDataForRequest(data), { include }).then(({ data }) => data.data)}
      onUpdate={(data: TQuestRequest) => updateQuest(questId, readyDataForRequest(data), { include }).then(({ data }) => data.data)}
      onDelete={() => destroyQuest(questId)}
      onCreated={(data) => {
        dispatch(addCampaignChildData({ field: 'quests', data: data }))
      }}
      onUpdated={(data) => {
        dispatch(updateCampaignChildData({ field: 'quests', data: data }))
      }}
      onDeleted={() => {
        dispatch(removeCampaignChildData({ field: 'quests', id: questId }))
      }}

      fields={[
        {
          name: 'type',
          label: 'Type',
          type: 'select',
          options: types ?? []
        }
      ]}

      defaultData={{ type: locationState?.type ? types?.find(type => type.id === locationState.type) : undefined }}

      persistedData={quest as TQuest}
      setPersistedData={(data) => dispatch(setQuestData(data))}
      updatePersistedData={(data) => dispatch(updateQuestData(data))}
      resetPersistedData={() => dispatch(clearQuestData(undefined))}
    />
  )
}

export default Quest
