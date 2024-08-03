import { createChildDataManager, TChildDataManager } from '../createChildDataManager'
import { TLocation, TCompendium } from '../../../types'
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
import { compendiumSlice } from '../../../reducers/compendium/compendiumSlice'
import LocationService, { TLocationRequest } from '../../../services/ApiService/Compendia/LocationService'
import { locationSlice } from '../../../reducers/compendium/location/locationSlice'

type TLocationDataManager = TChildDataManager<TCompendium, TLocation, TLocationRequest> & {
  compendium?: TCompendium,
  location?: TLocation,
} & hasImageableDataManager & hasNotesAttachableDataManager & hasQuestsAttachableDataManager & hasEncountersAttachableDataManager

const useLocationDataManager = (): TLocationDataManager => {
  const manager = useMemo(() => createChildDataManager(
    'location',
    'compendium',
    locationSlice,
    compendiumSlice,
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