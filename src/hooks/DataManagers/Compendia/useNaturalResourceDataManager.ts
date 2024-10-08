import { useChildDataManager, TChildDataManager } from '../useChildDataManager'
import { TNaturalResource, TCompendium } from '../../../types'
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
import NaturalResourceService, { TNaturalResourceRequest } from '../../../services/ApiService/Compendia/NaturalResourceService'
import { naturalResourceSlice } from '../../../reducers/compendium/naturalResource/naturalResourceSlice'

type TNaturalResourceDataManager = TChildDataManager<TCompendium, TNaturalResource, TNaturalResourceRequest> & {
  compendium?: TCompendium,
  naturalResource?: TNaturalResource,
} & hasImageableDataManager & hasNotesAttachableDataManager & hasQuestsAttachableDataManager & hasEncountersAttachableDataManager

const useNaturalResourceDataManager = (): TNaturalResourceDataManager => {
  const manager = useChildDataManager(
    'naturalResource',
    'compendium',
    naturalResourceSlice,
    compendiumSlice,
    NaturalResourceService,
  )
  return {
    ...manager,
    compendium: manager.parent,
    naturalResource: manager.entity,
    notes: useNotableDataManager(naturalResourceSlice, NaturalResourceService.notes),
    quests: useQuestableDataManager(naturalResourceSlice, NaturalResourceService.quests),
    encounters: useEncounterableDataManager(naturalResourceSlice, NaturalResourceService.encounters),
    images: useImageableDataManager(naturalResourceSlice, NaturalResourceService.images)
  }
}

export default useNaturalResourceDataManager;