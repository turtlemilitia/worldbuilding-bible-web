import { TCharacter } from '../../../types'
import { createChildApiService } from '../createApiService'
import { createNotableService } from '../createNotableService'
import { createImageableService } from '../createImageableService'
import { createQuestableService } from '../createQuestableService'
import { createEncounterableService } from '../createEncounterableService'
import { createFactionableService } from '../createFactionableService'
import { createLanguageableService } from '../createLanguageableService'
import { createSceneableService } from '../createSceneableService'

export interface TCharacterRequest {
  name: string;
  age: string;
  gender: string;
  content: string;
  speciesId: number;
}

type TCharacterResponse = TCharacter;

type TCharacterIndexResponse = TCharacter[];

const pluralName = 'characters'

const CharacterService = {
  ...createChildApiService<TCharacterRequest, TCharacterIndexResponse, TCharacterResponse>('compendia', pluralName),
  ...createNotableService(pluralName),
  ...createImageableService(pluralName),
  ...createQuestableService(pluralName),
  ...createEncounterableService(pluralName),
  ...createSceneableService(pluralName),
  ...createFactionableService(pluralName),
  ...createLanguageableService(pluralName),
}

export default CharacterService