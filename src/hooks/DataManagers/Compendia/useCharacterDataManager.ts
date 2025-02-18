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
    locations: useLocationableDataManager(manager, CharacterService.locations),
    notes: useNotableDataManager(manager, CharacterService.notes),
    quests: useQuestableDataManager(manager, CharacterService.quests),
    encounters: useEncounterableDataManager(manager, CharacterService.encounters),
    factions: useFactionableDataManager(manager, CharacterService.factions),
    languages: useLanguageableDataManager(manager, CharacterService.languages),
    scenes: useSceneableDataManager(manager, CharacterService.scenes),
    images: useImageableDataManager(manager, CharacterService.images)
  }
}

export default useCharacterDataManager;