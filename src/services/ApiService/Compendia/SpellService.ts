import { TSpell } from '../../../types'
import { createChildApiService } from '../createApiService'
import { createImageableService } from '../createImageableService'
import { createNotableService } from '../createNotableService'
import { createQuestableService } from '../createQuestableService'
import { createEncounterableService } from '../createEncounterableService'

export interface TSpellRequest {
  name: string;
  content: string;
}

type TSpellResponse = TSpell;

type TSpellIndexResponse = TSpell[];

const pluralName = 'spells'

const SpellService = {
  ...createChildApiService<TSpellRequest, TSpellIndexResponse, TSpellResponse>('compendia', pluralName),
  ...createNotableService(pluralName),
  ...createImageableService(pluralName),
  ...createQuestableService(pluralName),
  ...createEncounterableService(pluralName)
}

export default SpellService