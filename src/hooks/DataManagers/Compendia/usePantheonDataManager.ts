import { useChildDataManager, TChildDataManager } from '../useChildDataManager'
import { TPantheon, TCompendium } from '../../../types'
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
import PantheonService, { TPantheonRequest } from '../../../services/ApiService/Compendia/PantheonService'
import { pantheonSlice } from '../../../reducers/compendium/pantheon/pantheonSlice'

type TPantheonDataManager = TChildDataManager<TCompendium, TPantheon, TPantheonRequest> & {
  compendium?: TCompendium,
  pantheon?: TPantheon,
} & hasImageableDataManager & hasNotesAttachableDataManager & hasQuestsAttachableDataManager & hasEncountersAttachableDataManager

const usePantheonDataManager = (): TPantheonDataManager => {
  const manager = useChildDataManager(
    'pantheon',
    'compendium',
    pantheonSlice,
    compendiumSlice,
    PantheonService,
  )
  return {
    ...manager,
    compendium: manager.parent,
    pantheon: manager.entity,
    notes: useNotableDataManager(pantheonSlice, PantheonService.notes),
    quests: useQuestableDataManager(pantheonSlice, PantheonService.quests),
    encounters: useEncounterableDataManager(pantheonSlice, PantheonService.encounters),
    images: useImageableDataManager(pantheonSlice, PantheonService.images)
  }
}

export default usePantheonDataManager;