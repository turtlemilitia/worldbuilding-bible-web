import { createChildDataManager, TChildDataManager } from '../createChildDataManager'
import { TPlane, TCompendium } from '../../../types'
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
import PlaneService, { TPlaneRequest } from '../../../services/ApiService/Compendia/PlaneService'
import { planeSlice } from '../../../reducers/compendium/plane/planeSlice'

type TPlaneDataManager = TChildDataManager<TCompendium, TPlane, TPlaneRequest> & {
  compendium?: TCompendium,
  plane?: TPlane,
} & hasImageableDataManager & hasNotesAttachableDataManager & hasQuestsAttachableDataManager & hasEncountersAttachableDataManager

const usePlaneDataManager = (): TPlaneDataManager => {
  const manager = useMemo(() => createChildDataManager(
    'plane',
    'compendium',
    planeSlice,
    compendiumSlice,
    PlaneService,
  ), [])
  return {
    ...manager,
    compendium: manager.parent,
    plane: manager.entity,
    notes: useMemo(() => createNotableDataManager(planeSlice, PlaneService.notes), []),
    quests: useMemo(() => createQuestableDataManager(planeSlice, PlaneService.quests), []),
    encounters: useMemo(() => createEncounterableDataManager(planeSlice, PlaneService.encounters), []),
    images: useMemo(() => createImageableDataManager(planeSlice, PlaneService.images), [])
  }
}

export default usePlaneDataManager;