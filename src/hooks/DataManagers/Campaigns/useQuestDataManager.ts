import { useChildDataManager, TChildDataManager } from '../useChildDataManager'
import { TCampaign, TQuest } from '@/types'
import questService, { TQuestRequest } from '../../../services/ApiService/Campaigns/QuestService'
import { useAttachableDataManager, hasNotesAttachableDataManager } from '@/hooks/DataManagers'
import { useImageableDataManager, hasImageableDataManager } from '@/hooks/DataManagers'
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
    notes: useAttachableDataManager('notes', manager, questService.notes),
    images: useImageableDataManager(manager, questService.images)
  }
}

export default useQuestDataManager;