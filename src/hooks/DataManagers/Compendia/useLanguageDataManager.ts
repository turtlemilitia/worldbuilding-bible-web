import { useChildDataManager, TChildDataManager } from '../useChildDataManager'
import { TLanguage, TCompendium } from '../../../types'
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
import LanguageService, { TLanguageRequest } from '../../../services/ApiService/Compendia/LanguageService'
import { languageSlice } from '../../../reducers/compendium/language/languageSlice'

type TLanguageDataManager = TChildDataManager<TCompendium, TLanguage, TLanguageRequest> & {
  compendium?: TCompendium,
  language?: TLanguage,
} & hasImageableDataManager & hasNotesAttachableDataManager & hasQuestsAttachableDataManager & hasEncountersAttachableDataManager

const useLanguageDataManager = (): TLanguageDataManager => {
  const manager = useChildDataManager(
    'language',
    'compendium',
    languageSlice,
    compendiumSlice,
    LanguageService,
  )
  return {
    ...manager,
    compendium: manager.parent,
    language: manager.entity,
    notes: useNotableDataManager(languageSlice, LanguageService.notes),
    quests: useQuestableDataManager(languageSlice, LanguageService.quests),
    encounters: useEncounterableDataManager(languageSlice, LanguageService.encounters),
    images: useImageableDataManager(languageSlice, LanguageService.images)
  }
}

export default useLanguageDataManager;