import { useChildDataManager, TChildDataManager } from '../useChildDataManager'
import { TLocation, TCompendium } from '@/types'
import {
  useEncounterableDataManager,
  useNotableDataManager,
  useQuestableDataManager,
  useSceneableDataManager,
  useCharacterableDataManager,
  hasEncountersAttachableDataManager,
  hasNotesAttachableDataManager,
  hasQuestsAttachableDataManager,
  hasScenesAttachableDataManager,
  hasCharactersAttachableDataManager
} from '../useAttachableDataManager'
import { useImageableDataManager, hasImageableDataManager } from '@/hooks/DataManagers'
import LocationService, { TLocationRequest } from '../../../services/ApiService/Compendia/LocationService'
import { compendiaIndexSlice } from '@/reducers/compendium/compendiaIndexSlice'

export type TLocationDataManager = TChildDataManager<TCompendium, TLocation, TLocationRequest> & {
  compendium?: TCompendium,
  location?: TLocation,
} & hasImageableDataManager & hasNotesAttachableDataManager & hasQuestsAttachableDataManager & hasEncountersAttachableDataManager & hasScenesAttachableDataManager & hasCharactersAttachableDataManager

const useLocationDataManager = (compendiumId?: number, id?: number): TLocationDataManager => {
  const manager = useChildDataManager(
    'locations',
    'compendia',
    compendiumId,
    id,
    compendiaIndexSlice,
    LocationService,
  )
  return {
    ...manager,
    compendium: manager.parent,
    location: manager.entity,
    characters: useCharacterableDataManager(manager, LocationService.characters),
    notes: useNotableDataManager(manager, LocationService.notes),
    quests: useQuestableDataManager(manager, LocationService.quests),
    encounters: useEncounterableDataManager(manager, LocationService.encounters),
    scenes: useSceneableDataManager(manager, LocationService.scenes),
    images: useImageableDataManager(manager, LocationService.images)
  }
}

export default useLocationDataManager;