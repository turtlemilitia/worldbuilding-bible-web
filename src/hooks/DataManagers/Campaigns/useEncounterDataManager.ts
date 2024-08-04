import { useChildDataManager, TChildDataManager } from '../useChildDataManager'
import { encounterSlice } from '../../../reducers/campaign/encounter/encounterSlice'
import { campaignSlice } from '../../../reducers/campaign/campaignSlice'
import encounterService, { TEncounterRequest } from '../../../services/ApiService/Campaigns/EncounterService'
import { useAttachableDataManager, hasNotesAttachableDataManager } from '../useAttachableDataManager'
import { useImageableDataManager, hasImageableDataManager } from '../useImageableDataManager'
import { TCampaign, TEncounter } from '../../../types'

type TEncounterDataManager = TChildDataManager<TCampaign, TEncounter, TEncounterRequest> & {
  campaign?: TCampaign,
  encounter?: TEncounter
} & hasNotesAttachableDataManager & hasImageableDataManager

const useEncounterDataManager = (): TEncounterDataManager => {
  const manager = useChildDataManager(
    'encounter',
    'campaign',
    encounterSlice,
    campaignSlice,
    encounterService,
  )
  return {
    ...manager,
    encounter: manager.entity,
    notes: useAttachableDataManager('notes', encounterSlice, encounterService.notes),
    images: useImageableDataManager(encounterSlice, encounterService.images)
  }
}

export default useEncounterDataManager;