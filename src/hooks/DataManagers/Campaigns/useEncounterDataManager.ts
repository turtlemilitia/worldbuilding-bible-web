import { useChildDataManager, TChildDataManager } from '../useChildDataManager'
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
    characters: useCharacterableDataManager(manager, encounterService.characters),
    locations: useLocationableDataManager(manager, encounterService.locations),
    notes: useAttachableDataManager('notes', manager, encounterService.notes),
    images: useImageableDataManager(manager, encounterService.images)
  }
}

export default useEncounterDataManager;