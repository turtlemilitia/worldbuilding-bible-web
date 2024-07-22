import { createChildDataManager } from '../createChildDataManager'
import { encounterSlice } from '../../../reducers/campaign/encounter/encounterSlice'
import { campaignSlice } from '../../../reducers/campaign/campaignSlice'
import encounterService from '../../../services/ApiService/Campaigns/EncounterService'
import { createAttachableDataManager } from '../createAttachableDataManager'
import { createImageableDataManager } from '../createImageableDataManager'
import { useMemo } from 'react'

const useEncounterDataManager = () => {
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