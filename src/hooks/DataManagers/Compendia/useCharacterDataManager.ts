import { useChildDataManager, TChildDataManager } from '../useChildDataManager'
import { TCharacter, TCompendium } from '@/types'
import {
  useEncounterableDataManager,
  useFactionableDataManager,
  useLanguageableDataManager,
  useNotableDataManager,
  useQuestableDataManager,
  hasEncountersAttachableDataManager,
  hasFactionsAttachableDataManager,
  hasLanguagesAttachableDataManager,
  hasNotesAttachableDataManager,
  hasQuestsAttachableDataManager,
  useSceneableDataManager,
  hasScenesAttachableDataManager,
  useLocationableDataManager,
  hasLocationsAttachableDataManager
} from '../useAttachableDataManager'
import { useImageableDataManager, hasImageableDataManager } from '@/hooks/DataManagers'
import CharacterService, { TCharacterRequest } from '../../../services/ApiService/Compendia/CharacterService'
import { characterSlice } from '@/reducers/compendium/character/characterSlice'
import { compendiaIndexSlice } from '@/reducers/compendium/compendiaIndexSlice'

export type TCharacterDataManager = TChildDataManager<TCompendium, TCharacter, TCharacterRequest> & {
  compendium?: TCompendium,
  character?: TCharacter,
} & hasImageableDataManager & hasNotesAttachableDataManager & hasQuestsAttachableDataManager & hasEncountersAttachableDataManager & hasFactionsAttachableDataManager & hasLanguagesAttachableDataManager & hasScenesAttachableDataManager & hasLocationsAttachableDataManager

const useCharacterDataManager = (compendiumId?: number, id?: number): TCharacterDataManager => {
  const manager = useChildDataManager(
    'characters',
    'compendia',
    compendiumId,
    id,
    compendiaIndexSlice,
    CharacterService,
  )
  return {
    ...manager,
    compendium: manager.parent,
    character: manager.entity,
    locations: useLocationableDataManager(characterSlice, CharacterService.locations),
    notes: useNotableDataManager(characterSlice, CharacterService.notes),
    quests: useQuestableDataManager(characterSlice, CharacterService.quests),
    encounters: useEncounterableDataManager(characterSlice, CharacterService.encounters),
    factions: useFactionableDataManager(characterSlice, CharacterService.factions),
    languages: useLanguageableDataManager(characterSlice, CharacterService.languages),
    scenes: useSceneableDataManager(characterSlice, CharacterService.scenes),
    images: useImageableDataManager(characterSlice, CharacterService.images)
  }
}

export default useCharacterDataManager;