import { useChildDataManager, TChildDataManager } from '../useChildDataManager'
import { TCampaign, TQuest } from '../../../types'
import questService, { TQuestRequest } from '../../../services/ApiService/Campaigns/QuestService'
import { useAttachableDataManager, hasNotesAttachableDataManager } from '../useAttachableDataManager'
import { useImageableDataManager, hasImageableDataManager } from '../useImageableDataManager'
import { questSlice } from '../../../reducers/campaign/quest/questSlice'
import { campaignSlice } from '../../../reducers/campaign/campaignSlice'
import { campaignsIndexSlice } from '@/reducers/campaign/campaignsIndexSlice'

export type TQuestDataManager = TChildDataManager<TCampaign, TQuest, TQuestRequest> & {
  campaign?: TCampaign,
  quest?: TQuest,
} & hasNotesAttachableDataManager & hasImageableDataManager

const useQuestDataManager = (campaignId?: number, id?: number): TQuestDataManager => {
  const manager = useChildDataManager(
    'quests',
    'campaigns',
    campaignId,
    id,
    campaignsIndexSlice,
    questService,
  )
  return {
    ...manager,
    campaign: manager.parent,
    quest: manager.entity as TQuest|undefined,
    notes: useAttachableDataManager('notes', questSlice, questService.notes),
    images: useImageableDataManager(questSlice, questService.images)
  }
}

export default useQuestDataManager;