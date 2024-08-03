import { createChildDataManager, TChildDataManager } from '../createChildDataManager'
import { TCharacter, TCompendium } from '../../../types'
import {
  createEncounterableDataManager,
  createFactionableDataManager,
  createLanguageableDataManager,
  createNotableDataManager,
  createQuestableDataManager,
  hasEncountersAttachableDataManager, hasFactionsAttachableDataManager, hasLanguagesAttachableDataManager,
  hasNotesAttachableDataManager,
  hasQuestsAttachableDataManager
} from '../createAttachableDataManager'
import { createImageableDataManager, hasImageableDataManager } from '../createImageableDataManager'
import { useMemo } from 'react'
import { compendiumSlice } from '../../../reducers/compendium/compendiumSlice'
import CharacterService, { TCharacterRequest } from '../../../services/ApiService/Compendia/CharacterService'
import { characterSlice } from '../../../reducers/compendium/character/characterSlice'

type TCharacterDataManager = TChildDataManager<TCompendium, TCharacter, TCharacterRequest> & {
  compendium?: TCompendium,
  character?: TCharacter,
} & hasImageableDataManager & hasNotesAttachableDataManager & hasQuestsAttachableDataManager & hasEncountersAttachableDataManager & hasFactionsAttachableDataManager & hasLanguagesAttachableDataManager

const useCharacterDataManager = (): TCharacterDataManager => {
  const manager = useMemo(() => createChildDataManager(
    'character',
    'compendium',
    characterSlice,
    compendiumSlice,
    CharacterService,
  ), [])
  return {
    ...manager,
    compendium: manager.parent,
    character: manager.entity,
    notes: useMemo(() => createNotableDataManager(characterSlice, CharacterService.notes), []),
    quests: useMemo(() => createQuestableDataManager(characterSlice, CharacterService.quests), []),
    encounters: useMemo(() => createEncounterableDataManager(characterSlice, CharacterService.encounters), []),
    factions: useMemo(() => createFactionableDataManager(characterSlice, CharacterService.factions), []),
    languages: useMemo(() => createLanguageableDataManager(characterSlice, CharacterService.languages), []),
    images: useMemo(() => createImageableDataManager(characterSlice, CharacterService.images), [])
  }
}

export default useCharacterDataManager;