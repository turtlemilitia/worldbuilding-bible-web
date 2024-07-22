import { createChildDataManager, TUseChildDataManager } from '../createChildDataManager'
import { TCampaign, TLocation, TCompendium } from '../../../types'
import {
  createEncounterableDataManager,
  createNotableDataManager,
  createQuestableDataManager,
  hasEncountersAttachableDataManager,
  hasNotesAttachableDataManager,
  hasQuestsAttachableDataManager
} from '../createAttachableDataManager'
import { createImageableDataManager, hasImageableDataManager } from '../createImageableDataManager'
import { useMemo } from 'react'
import { campaignSlice } from '../../../reducers/campaign/campaignSlice'
import LocationService, { TLocationRequest } from '../../../services/ApiService/Compendia/LocationService'
import { locationSlice } from '../../../reducers/compendium/location/locationSlice'

type TUseLocationDataManager = TUseChildDataManager<TCampaign, TLocation, TLocationRequest> & {
  compendium?: TCompendium,
  location?: TLocation,
} & hasImageableDataManager & hasNotesAttachableDataManager & hasQuestsAttachableDataManager & hasEncountersAttachableDataManager

const useLocationDataManager = (): TUseLocationDataManager => {
  const manager = useMemo(() => createChildDataManager(
    'location',
    'campaign',
    locationSlice,
    campaignSlice,
    LocationService,
  ), [])
  return {
    ...manager,
    compendium: manager.parent,
    location: manager.entity,
    notes: useMemo(() => createNotableDataManager(locationSlice, LocationService.notes), []),
    quests: useMemo(() => createQuestableDataManager(locationSlice, LocationService.quests), []),
    encounters: useMemo(() => createEncounterableDataManager(locationSlice, LocationService.encounters), []),
    images: useMemo(() => createImageableDataManager(locationSlice, LocationService.images), [])
  }
}

export default useLocationDataManager;