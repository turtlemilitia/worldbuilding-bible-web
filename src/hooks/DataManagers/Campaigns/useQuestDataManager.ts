import { createChildDataManager, TChildDataManager } from '../createChildDataManager'
import { TCampaign, TQuest } from '../../../types'
import questService, { TQuestRequest } from '../../../services/ApiService/Campaigns/QuestService'
import { createAttachableDataManager, hasNotesAttachableDataManager } from '../createAttachableDataManager'
import { createImageableDataManager, hasImageableDataManager } from '../createImageableDataManager'
import { useMemo } from 'react'
import { questSlice } from '../../../reducers/campaign/quest/questSlice'
import { campaignSlice } from '../../../reducers/campaign/campaignSlice'

type TQuestDataManager = TChildDataManager<TCampaign, TQuest, TQuestRequest> & {
  campaign?: TCampaign,
  quest?: TQuest,
} & hasNotesAttachableDataManager & hasImageableDataManager

const useQuestDataManager = (): TQuestDataManager => {
  const manager = useMemo(() => createChildDataManager(
    'quest',
    'campaign',
    questSlice,
    campaignSlice,
    questService,
  ), [])
  return {
    ...manager,
    campaign: manager.parent,
    quest: manager.entity,
    notes: useMemo(() => createAttachableDataManager('notes', questSlice, questService.notes), []),
    images: useMemo(() => createImageableDataManager(questSlice, questService.images), [])
  }
}

export default useQuestDataManager;