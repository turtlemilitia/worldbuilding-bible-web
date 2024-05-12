import React, { FunctionComponent, JSX, useContext, useEffect, useState } from 'react'
import { destroyQuest, storeQuest, TQuestRequest, updateQuest, viewQuest } from '../../../services/QuestService'
import { clearQuestData, setQuestData, updateQuestData } from '../../../reducers/campaign/quest/questSlice'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../../store'
import {
  addCampaignChildData,
  removeCampaignChildData,
  updateCampaignChildData
} from '../../../reducers/campaign/campaignSlice'
import { TQuest } from '../../../types'
import Post from '../../../components/Post'
import { QuestWrapperContext } from '../../../components/QuestWrapper/component'
import { TField } from '../../../hooks/useFields'

const include = 'type;parent'

const Quest: FunctionComponent = (): JSX.Element => {

  const { campaign } = useAppSelector((state: RootState) => state.campaign) // redux
  const { quest } = useAppSelector((state: RootState) => state.quest) // redux

  const dispatch = useAppDispatch() // redux

  const navigate = useNavigate()

  const { state: locationState } = useLocation()

  const { campaignId, questId } = useParams() as { campaignId: string; questId: string } // router

  const [ready, setReady] = useState<boolean>(false)

  const types = useContext(QuestWrapperContext)

  useEffect(() => {

    if (types !== undefined) {
      setReady(true)
    }

  }, [types])

  const readyDataForRequest = (data: any): TQuestRequest => ({
    name: data.name,
    content: data.content,
    typeId: data.type.id,
    parentId: data.parent?.id,
  })

  const fields: TField[] = [
    {
      name: 'type',
      label: 'Type',
      type: 'select',
      options: types ?? [],
    }
  ]
  if (campaign?.quests.length) {
    fields.push(
      {
        name: 'parent',
        label: 'Parent',
        type: 'select',
        options: campaign?.quests.filter(campaignQuest => campaignQuest.id !== quest.id) ?? []
      }
    )
  }

  return (
    <Post
      key={questId}
      isNew={questId === 'new'}
      pageTypeName={'Quest'}
      canEdit={quest.canUpdate}
      canDelete={quest.canDelete}
      ready={ready}
      mapData={readyDataForRequest}

      onFetch={() => viewQuest(questId, { include }).then(({ data }) => data.data)}
      onCreate={(data: TQuestRequest) => storeQuest(campaignId, readyDataForRequest(data), { include }).then(({ data }) => data.data)}
      onUpdate={(data: TQuestRequest) => updateQuest(questId, readyDataForRequest(data), { include }).then(({ data }) => data.data)}
      onDelete={() => destroyQuest(questId)}
      onCreated={(data) => {
        dispatch(addCampaignChildData({ field: 'quests', data: data }))
        navigate(`/campaigns/${campaignId}/quests/${data.slug}`)
      }}
      onUpdated={(data) => {
        dispatch(updateCampaignChildData({ field: 'quests', data: data }))
      }}
      onDeleted={() => {
        dispatch(removeCampaignChildData({ field: 'quests', id: questId }))
        navigate(`/campaigns/${campaignId}`)
      }}

      fields={fields}

      defaultData={{
        type: locationState?.type ? types?.find(type => type.id === locationState.type) : undefined,
        parent: locationState?.parent ? campaign?.quests?.find(campaignQuest => campaignQuest.id === locationState.parent) : undefined,
      }}

      persistedData={quest as TQuest}
      setPersistedData={(data) => dispatch(setQuestData(data))}
      updatePersistedData={(data) => dispatch(updateQuestData(data))}
      resetPersistedData={() => dispatch(clearQuestData(undefined))}
    />
  )
}

export default Quest
