import { createChildDataManager, TChildDataManager } from '../createChildDataManager'
import { TLanguage, TCompendium } from '../../../types'
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
import { compendiumSlice } from '../../../reducers/compendium/compendiumSlice'
import LanguageService, { TLanguageRequest } from '../../../services/ApiService/Compendia/LanguageService'
import { languageSlice } from '../../../reducers/compendium/language/languageSlice'

type TLanguageDataManager = TChildDataManager<TCompendium, TLanguage, TLanguageRequest> & {
  compendium?: TCompendium,
  language?: TLanguage,
} & hasImageableDataManager & hasNotesAttachableDataManager & hasQuestsAttachableDataManager & hasEncountersAttachableDataManager

const useLanguageDataManager = (): TLanguageDataManager => {
  const manager = useMemo(() => createChildDataManager(
    'language',
    'compendium',
    languageSlice,
    compendiumSlice,
    LanguageService,
  ), [])
  return {
    ...manager,
    compendium: manager.parent,
    language: manager.entity,
    notes: useMemo(() => createNotableDataManager(languageSlice, LanguageService.notes), []),
    quests: useMemo(() => createQuestableDataManager(languageSlice, LanguageService.quests), []),
    encounters: useMemo(() => createEncounterableDataManager(languageSlice, LanguageService.encounters), []),
    images: useMemo(() => createImageableDataManager(languageSlice, LanguageService.images), [])
  }
}

export default useLanguageDataManager;