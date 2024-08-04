import { useChildDataManager, TChildDataManager } from '../useChildDataManager'
import { TLocation, TCompendium } from '../../../types'
import {
  useEncounterableDataManager,
  useNotableDataManager,
  useQuestableDataManager,
  hasEncountersAttachableDataManager,
  hasNotesAttachableDataManager,
  hasQuestsAttachableDataManager
} from '../useAttachableDataManager'
import { useImageableDataManager, hasImageableDataManager } from '../useImageableDataManager'
import { compendiumSlice } from '../../../reducers/compendium/compendiumSlice'
import LocationService, { TLocationRequest } from '../../../services/ApiService/Compendia/LocationService'
import { locationSlice } from '../../../reducers/compendium/location/locationSlice'

type TLocationDataManager = TChildDataManager<TCompendium, TLocation, TLocationRequest> & {
  compendium?: TCompendium,
  location?: TLocation,
} & hasImageableDataManager & hasNotesAttachableDataManager & hasQuestsAttachableDataManager & hasEncountersAttachableDataManager

const useLocationDataManager = (): TLocationDataManager => {
  const manager = useChildDataManager(
    'location',
    'compendium',
    locationSlice,
    compendiumSlice,
    LocationService,
  )
  return {
    ...manager,
    compendium: manager.parent,
    location: manager.entity,
    notes: useNotableDataManager(locationSlice, LocationService.notes),
    quests: useQuestableDataManager(locationSlice, LocationService.quests),
    encounters: useEncounterableDataManager(locationSlice, LocationService.encounters),
    images: useImageableDataManager(locationSlice, LocationService.images)
  }
}

export default useLocationDataManager;