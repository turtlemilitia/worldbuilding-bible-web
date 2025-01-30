import { useChildDataManager, TChildDataManager } from '../useChildDataManager'
import { TReligion, TCompendium } from '@/types'
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
    notes: useNotableDataManager(manager, ReligionService.notes),
    quests: useQuestableDataManager(manager, ReligionService.quests),
    encounters: useEncounterableDataManager(manager, ReligionService.encounters),
    images: useImageableDataManager(manager, ReligionService.images)
  }
}

export default useReligionDataManager;