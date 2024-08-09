import { TConcept } from '../../../types'
import { createChildApiService } from '../createApiService'
import { createImageableService } from '../createImageableService'
import { createNotableService } from '../createNotableService'
import { createQuestableService } from '../createQuestableService'
import { createEncounterableService } from '../createEncounterableService'

export interface TConceptRequest {
  name: string;
  content: string;
}

type TConceptResponse = TConcept;

type TConceptIndexResponse = TConcept[];

const pluralName = 'concepts'

const ConceptService = {
  ...createChildApiService<TConceptRequest, TConceptIndexResponse, TConceptResponse>('compendia', pluralName),
  ...createNotableService(pluralName),
  ...createImageableService(pluralName),
  ...createQuestableService(pluralName),
  ...createEncounterableService(pluralName)
}

export default ConceptService