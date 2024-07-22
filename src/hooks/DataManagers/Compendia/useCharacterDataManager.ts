import { createChildDataManager, TUseChildDataManager } from '../createChildDataManager'
import { TCampaign, TCharacter, TCompendium } from '../../../types'
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
import { campaignSlice } from '../../../reducers/campaign/campaignSlice'
import CharacterService, { TCharacterRequest } from '../../../services/ApiService/Compendia/CharacterService'
import { characterSlice } from '../../../reducers/compendium/character/characterSlice'

type TUseCharacterDataManager = TUseChildDataManager<TCampaign, TCharacter, TCharacterRequest> & {
  compendium?: TCompendium,
  character?: TCharacter,
} & hasImageableDataManager & hasNotesAttachableDataManager & hasQuestsAttachableDataManager & hasEncountersAttachableDataManager

const useCharacterDataManager = (): TUseCharacterDataManager => {
  const manager = useMemo(() => createChildDataManager(
    'character',
    'campaign',
    characterSlice,
    campaignSlice,
    CharacterService,
  ), [])
  return {
    ...manager,
    compendium: manager.parent,
    character: manager.entity,
    notes: useMemo(() => createNotableDataManager(characterSlice, CharacterService.notes), []),
    quests: useMemo(() => createQuestableDataManager(characterSlice, CharacterService.quests), []),
    encounters: useMemo(() => createEncounterableDataManager(characterSlice, CharacterService.encounters), []),
    images: useMemo(() => createImageableDataManager(characterSlice, CharacterService.images), [])
  }
}

export default useCharacterDataManager;