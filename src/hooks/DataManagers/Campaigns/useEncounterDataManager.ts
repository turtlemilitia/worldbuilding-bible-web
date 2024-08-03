import { createChildDataManager, TChildDataManager } from '../createChildDataManager'
import { encounterSlice } from '../../../reducers/campaign/encounter/encounterSlice'
import { campaignSlice } from '../../../reducers/campaign/campaignSlice'
import encounterService, { TEncounterRequest } from '../../../services/ApiService/Campaigns/EncounterService'
import { createAttachableDataManager, hasNotesAttachableDataManager } from '../createAttachableDataManager'
import { createImageableDataManager, hasImageableDataManager } from '../createImageableDataManager'
import { useMemo } from 'react'
import { TCampaign, TEncounter } from '../../../types'

type TEncounterDataManager = TChildDataManager<TCampaign, TEncounter, TEncounterRequest> & {
  campaign?: TCampaign,
  encounter?: TEncounter
} & hasNotesAttachableDataManager & hasImageableDataManager

const useEncounterDataManager = (): TEncounterDataManager => {
  const manager = useMemo(() => createChildDataManager(
    'encounter',
    'campaign',
    encounterSlice,
    campaignSlice,
    encounterService,
  ), [])
  return {
    ...manager,
    encounter: manager.entity,
    notes: useMemo(() => createAttachableDataManager('notes', encounterSlice, encounterService.notes), []),
    images: useMemo(() => createImageableDataManager(encounterSlice, encounterService.images), [])
  }
}

export default useEncounterDataManager;