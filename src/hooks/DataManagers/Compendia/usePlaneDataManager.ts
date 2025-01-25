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
import { compendiaIndexSlice } from '@/reducers/compendium/compendiaIndexSlice'

export type TPlaneDataManager = TChildDataManager<TCompendium, TPlane, TPlaneRequest> & {
  compendium?: TCompendium,
  plane?: TPlane,
} & hasImageableDataManager & hasNotesAttachableDataManager & hasQuestsAttachableDataManager & hasEncountersAttachableDataManager

const usePlaneDataManager = (compendiumId?: number, id?: number): TPlaneDataManager => {
  const manager = useChildDataManager(
    'planes',
    'compendia',
    compendiumId,
    id,
    compendiaIndexSlice,
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