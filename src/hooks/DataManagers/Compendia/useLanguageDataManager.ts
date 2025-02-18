import { useChildDataManager, TChildDataManager } from '../useChildDataManager'
import { TLanguage, TCompendium } from '@/types'
import {
  useEncounterableDataManager,
  useNotableDataManager,
  useQuestableDataManager,
  hasEncountersAttachableDataManager,
  hasNotesAttachableDataManager,
  hasQuestsAttachableDataManager
} from '../useAttachableDataManager'
import { useImageableDataManager, hasImageableDataManager } from '@/hooks/DataManagers'
import LanguageService, { TLanguageRequest } from '../../../services/ApiService/Compendia/LanguageService'
import { compendiaIndexSlice } from '@/reducers/compendium/compendiaIndexSlice'

export type TLanguageDataManager = TChildDataManager<TCompendium, TLanguage, TLanguageRequest> & {
  compendium?: TCompendium,
  language?: TLanguage,
} & hasImageableDataManager & hasNotesAttachableDataManager & hasQuestsAttachableDataManager & hasEncountersAttachableDataManager

const useLanguageDataManager = (compendiumId?: number, id?: number): TLanguageDataManager => {
  const manager = useChildDataManager(
    'languages',
    'compendia',
    compendiumId,
    id,
    compendiaIndexSlice,
    LanguageService,
  )
  return {
    ...manager,
    compendium: manager.parent,
    language: manager.entity,
    notes: useNotableDataManager(manager, LanguageService.notes),
    quests: useQuestableDataManager(manager, LanguageService.quests),
    encounters: useEncounterableDataManager(manager, LanguageService.encounters),
    images: useImageableDataManager(manager, LanguageService.images)
  }
}

export default useLanguageDataManager;