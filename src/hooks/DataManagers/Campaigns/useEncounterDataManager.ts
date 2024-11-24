import { useChildDataManager, TChildDataManager } from '../useChildDataManager'
import { encounterSlice } from '@/reducers/campaign/encounter/encounterSlice'
import { campaignSlice } from '@/reducers/campaign/campaignSlice'
import encounterService, { TEncounterRequest } from '../../../services/ApiService/Campaigns/EncounterService'
import {
  useAttachableDataManager,
  hasNotesAttachableDataManager,
  useCharacterableDataManager,
  useLocationableDataManager,
  hasCharactersAttachableDataManager, hasLocationsAttachableDataManager,
} from '../useAttachableDataManager'
import { useImageableDataManager, hasImageableDataManager } from '@/hooks/DataManagers'
import { TCampaign, TEncounter } from '@/types'

type TEncounterDataManager = TChildDataManager<TCampaign, TEncounter, TEncounterRequest> & {
  campaign?: TCampaign,
  encounter?: TEncounter
} & hasNotesAttachableDataManager & hasImageableDataManager & hasCharactersAttachableDataManager & hasLocationsAttachableDataManager

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
    characters: useCharacterableDataManager(encounterSlice, encounterService.characters),
    locations: useLocationableDataManager(encounterSlice, encounterService.locations),
    notes: useAttachableDataManager('notes', encounterSlice, encounterService.notes),
    images: useImageableDataManager(encounterSlice, encounterService.images)
  }
}

export default useEncounterDataManager;