import { createChildDataManager, TUseChildDataManager } from '../createChildDataManager'
import { TCampaign, TPlane, TCompendium } from '../../../types'
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
import PlaneService, { TPlaneRequest } from '../../../services/ApiService/Compendia/PlaneService'
import { planeSlice } from '../../../reducers/compendium/plane/planeSlice'

type TUsePlaneDataManager = TUseChildDataManager<TCampaign, TPlane, TPlaneRequest> & {
  compendium?: TCompendium,
  plane?: TPlane,
} & hasImageableDataManager & hasNotesAttachableDataManager & hasQuestsAttachableDataManager & hasEncountersAttachableDataManager

const usePlaneDataManager = (): TUsePlaneDataManager => {
  const manager = useMemo(() => createChildDataManager(
    'plane',
    'campaign',
    planeSlice,
    campaignSlice,
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