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
import { compendiaIndexSlice } from '@/reducers/compendium/compendiaIndexSlice'

export type TPantheonDataManager = TChildDataManager<TCompendium, TPantheon, TPantheonRequest> & {
  compendium?: TCompendium,
  pantheon?: TPantheon,
} & hasImageableDataManager & hasNotesAttachableDataManager & hasQuestsAttachableDataManager & hasEncountersAttachableDataManager

const usePantheonDataManager = (compendiumId?: number, id?: number): TPantheonDataManager => {
  const manager = useChildDataManager(
    'pantheons',
    'compendia',
    compendiumId,
    id,
    compendiaIndexSlice,
    PantheonService,
  )
  return {
    ...manager,
    compendium: manager.parent,
    pantheon: manager.entity,
    notes: useNotableDataManager(manager, PantheonService.notes),
    quests: useQuestableDataManager(manager, PantheonService.quests),
    encounters: useEncounterableDataManager(manager, PantheonService.encounters),
    images: useImageableDataManager(manager, PantheonService.images)
  }
}

export default usePantheonDataManager;