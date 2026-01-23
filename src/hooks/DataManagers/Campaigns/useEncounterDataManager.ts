import { useChildDataManager, TChildDataManager } from '../useChildDataManager'
import encounterService, { TEncounterRequest } from '../../../services/ApiService/Campaigns/EncounterService'
import {
  useAttachableDataManager,
  hasNotesAttachableDataManager,
  useCharacterableDataManager,
  useLocationableDataManager,
  hasCharactersAttachableDataManager, hasLocationsAttachableDataManager,
  useSessionableDataManager, hasSessionsAttachableDataManager,
} from '../useAttachableDataManager'
import { useImageableDataManager, hasImageableDataManager } from '@/hooks/DataManagers'
import { TCampaign, TEncounter } from '@/types'
import { campaignsIndexSlice } from '@/reducers/campaign/campaignsIndexSlice'

export type TEncounterDataManager = TChildDataManager<TCampaign, TEncounter, TEncounterRequest> & {
  campaign?: TCampaign,
  encounter?: TEncounter
} & hasNotesAttachableDataManager
  & hasImageableDataManager
  & hasCharactersAttachableDataManager
  & hasLocationsAttachableDataManager
  & hasSessionsAttachableDataManager

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
    campaign: manager.parent,
    characters: useCharacterableDataManager(manager, encounterService.characters),
    locations: useLocationableDataManager(manager, encounterService.locations),
    sessions: useSessionableDataManager(manager, encounterService.sessions),
    notes: useAttachableDataManager('notes', manager, encounterService.notes),
    images: useImageableDataManager(manager, encounterService.images)
  }
}

export default useEncounterDataManager;