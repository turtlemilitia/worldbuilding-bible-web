import { useChildDataManager, TChildDataManager } from '../useChildDataManager'
import { TPlane, TCompendium } from '@/types'
import {
  useEncounterableDataManager,
  useNotableDataManager,
  useQuestableDataManager,
  hasEncountersAttachableDataManager,
  hasNotesAttachableDataManager,
  hasQuestsAttachableDataManager
} from '../useAttachableDataManager'
import { useImageableDataManager, hasImageableDataManager } from '@/hooks/DataManagers'
import PlaneService, { TPlaneRequest } from '../../../services/ApiService/Compendia/PlaneService'
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
    notes: useNotableDataManager(manager, PlaneService.notes),
    quests: useQuestableDataManager(manager, PlaneService.quests),
    encounters: useEncounterableDataManager(manager, PlaneService.encounters),
    images: useImageableDataManager(manager, PlaneService.images)
  }
}

export default usePlaneDataManager;