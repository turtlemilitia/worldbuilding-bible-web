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
import { useImageableDataManager, hasImageableDataManager } from '@/hooks/DataManagers'
import ReligionService, { TReligionRequest } from '../../../services/ApiService/Compendia/ReligionService'
import { religionSlice } from '@/reducers/compendium/religion/religionSlice'
import { compendiaIndexSlice } from '@/reducers/compendium/compendiaIndexSlice'

export type TReligionDataManager = TChildDataManager<TCompendium, TReligion, TReligionRequest> & {
  compendium?: TCompendium,
  religion?: TReligion,
} & hasImageableDataManager & hasNotesAttachableDataManager & hasQuestsAttachableDataManager & hasEncountersAttachableDataManager

const useReligionDataManager = (compendiumId?: number, id?: number): TReligionDataManager => {
  const manager = useChildDataManager(
    'religions',
    'compendia',
    compendiumId,
    id,
    compendiaIndexSlice,
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