import { useChildDataManager, TChildDataManager } from '../useChildDataManager'
import { TDeity, TCompendium } from '../../../types'
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
import DeityService, { TDeityRequest } from '../../../services/ApiService/Compendia/DeityService'
import { deitySlice } from '../../../reducers/compendium/deity/deitySlice'

type TDeityDataManager = TChildDataManager<TCompendium, TDeity, TDeityRequest> & {
  compendium?: TCompendium,
  deity?: TDeity,
} & hasImageableDataManager & hasNotesAttachableDataManager & hasQuestsAttachableDataManager & hasEncountersAttachableDataManager

const useDeityDataManager = (): TDeityDataManager => {
  const manager = useChildDataManager(
    'deity',
    'compendium',
    deitySlice,
    compendiumSlice,
    DeityService,
  )
  return {
    ...manager,
    compendium: manager.parent,
    deity: manager.entity,
    notes: useNotableDataManager(deitySlice, DeityService.notes),
    quests: useQuestableDataManager(deitySlice, DeityService.quests),
    encounters: useEncounterableDataManager(deitySlice, DeityService.encounters),
    images: useImageableDataManager(deitySlice, DeityService.images)
  }
}

export default useDeityDataManager;