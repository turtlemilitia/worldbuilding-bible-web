import { useChildDataManager, TChildDataManager } from '../useChildDataManager'
import { TCampaign, TQuest } from '../../../types'
import questService, { TQuestRequest } from '../../../services/ApiService/Campaigns/QuestService'
import { useAttachableDataManager, hasNotesAttachableDataManager } from '../useAttachableDataManager'
import { useImageableDataManager, hasImageableDataManager } from '../useImageableDataManager'
import { questSlice } from '../../../reducers/campaign/quest/questSlice'
import { campaignSlice } from '../../../reducers/campaign/campaignSlice'

type TQuestDataManager = TChildDataManager<TCampaign, TQuest, TQuestRequest> & {
  campaign?: TCampaign,
  quest?: TQuest,
} & hasNotesAttachableDataManager & hasImageableDataManager

const useQuestDataManager = (): TQuestDataManager => {
  const manager = useChildDataManager(
    'quest',
    'campaign',
    questSlice,
    campaignSlice,
    questService,
  )
  return {
    ...manager,
    campaign: manager.parent,
    quest: manager.entity,
    notes: useAttachableDataManager('notes', questSlice, questService.notes),
    images: useImageableDataManager(questSlice, questService.images)
  }
}

export default useQuestDataManager;