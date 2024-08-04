import { useChildDataManager, TChildDataManager } from '../useChildDataManager'
import { TReligion, TCompendium } from '../../../types'
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
import ReligionService, { TReligionRequest } from '../../../services/ApiService/Compendia/ReligionService'
import { religionSlice } from '../../../reducers/compendium/religion/religionSlice'

type TReligionDataManager = TChildDataManager<TCompendium, TReligion, TReligionRequest> & {
  compendium?: TCompendium,
  religion?: TReligion,
} & hasImageableDataManager & hasNotesAttachableDataManager & hasQuestsAttachableDataManager & hasEncountersAttachableDataManager

const useReligionDataManager = (): TReligionDataManager => {
  const manager = useChildDataManager(
    'religion',
    'compendium',
    religionSlice,
    compendiumSlice,
    ReligionService,
  )
  return {
    ...manager,
    compendium: manager.parent,
    religion: manager.entity,
    notes: useNotableDataManager(religionSlice, ReligionService.notes),
    quests: useQuestableDataManager(religionSlice, ReligionService.quests),
    encounters: useEncounterableDataManager(religionSlice, ReligionService.encounters),
    images: useImageableDataManager(religionSlice, ReligionService.images)
  }
}

export default useReligionDataManager;