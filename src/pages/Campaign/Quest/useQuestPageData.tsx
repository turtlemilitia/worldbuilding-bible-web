import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../../hooks'
import { RootState } from '../../../store'
import { TQuest } from '../../../types'
import { setQuestData, updateQuestData } from '../../../reducers/campaign/quest/questSlice'
import {
  addCampaignChildData,
  removeCampaignChildData,
  updateCampaignChildData
} from '../../../reducers/campaign/campaignSlice'
import { useContext, useEffect, useMemo } from 'react'
import { QuestWrapperContext } from '../../../components/QuestWrapper/component'

const useQuestPageData = () => {

  const { campaignId, questId } = useParams() as { campaignId: string; questId: string } // router
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { quest: persistedData } = useAppSelector((state: RootState) => state.quest) // redux]

  const isNew: boolean = useMemo(() => questId === 'new', [questId])
  const canEdit: boolean = useMemo(() => isNew || persistedData?.canUpdate !== undefined, [isNew, persistedData?.canUpdate])

  // todo reconsider this? doesn feel right
  const types = useContext(QuestWrapperContext);

  // default data
  const { state: locationState } = useLocation()
  useEffect(() => {
    if (locationState?.type) {
      dispatch(updateQuestData({ type: types?.find(type => type.id === locationState.type) }))
    }
  }, [locationState])

  return {
    isNew,
    canEdit,
    campaignId,
    questId,
    persistedData,
    setPersistedData: (data?: TQuest) => dispatch(setQuestData(data)),
    updatePersistedData: (data: Partial<TQuest>) => dispatch(updateQuestData(data)),
    resetPersistedData: () => dispatch(setQuestData(undefined)),
    onCreated: (data: TQuest) => {
      dispatch(addCampaignChildData({ field: 'quests', data: data }))
      navigate(`/campaigns/${campaignId}/quests/${persistedData?.slug}`)
    },
    onUpdated: (data: TQuest) => {
      dispatch(updateCampaignChildData({ field: 'quests', data: data }))
    },
    onDeleted: () => {
      dispatch(removeCampaignChildData({ field: 'quests', id: questId }))
      navigate(`/campaigns/${campaignId}`)
    },
  }

}

export default useQuestPageData
