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
import { campaignsIndexSlice } from '@/reducers/campaign/campaignsIndexSlice'

export type TEncounterDataManager = TChildDataManager<TCampaign, TEncounter, TEncounterRequest> & {
  campaign?: TCampaign,
  encounter?: TEncounter
} & hasNotesAttachableDataManager & hasImageableDataManager & hasCharactersAttachableDataManager & hasLocationsAttachableDataManager

const useEncounterDataManager = (campaignId?: number, id?: number): TEncounterDataManager => {
  const manager = useChildDataManager(
    'encounters',
    'campaigns',
    campaignId,
    id,
    campaignsIndexSlice,
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