import { useChildDataManager, TChildDataManager } from '../useChildDataManager'
import { TPlane, TCompendium } from '../../../types'
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
import PlaneService, { TPlaneRequest } from '../../../services/ApiService/Compendia/PlaneService'
import { planeSlice } from '../../../reducers/compendium/plane/planeSlice'

type TPlaneDataManager = TChildDataManager<TCompendium, TPlane, TPlaneRequest> & {
  compendium?: TCompendium,
  plane?: TPlane,
} & hasImageableDataManager & hasNotesAttachableDataManager & hasQuestsAttachableDataManager & hasEncountersAttachableDataManager

const usePlaneDataManager = (): TPlaneDataManager => {
  const manager = useChildDataManager(
    'plane',
    'compendium',
    planeSlice,
    compendiumSlice,
    PlaneService,
  )
  return {
    ...manager,
    compendium: manager.parent,
    plane: manager.entity,
    notes: useNotableDataManager(planeSlice, PlaneService.notes),
    quests: useQuestableDataManager(planeSlice, PlaneService.quests),
    encounters: useEncounterableDataManager(planeSlice, PlaneService.encounters),
    images: useImageableDataManager(planeSlice, PlaneService.images)
  }
}

export default usePlaneDataManager;