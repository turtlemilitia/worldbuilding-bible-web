import { TSpecies } from '../../../types'
import { createChildApiService } from '../createApiService'
import { createImageableService } from '../createImageableService'
import { createNotableService } from '../createNotableService'
import { createQuestableService } from '../createQuestableService'
import { createEncounterableService } from '../createEncounterableService'

export interface TSpeciesRequest {
  name: string;
  content: string;
}

type TSpeciesResponse =  TSpecies;

type TSpeciesIndexResponse = TSpecies[];

const pluralName = 'species'

const SpeciesService = {
  ...createChildApiService<TSpeciesRequest, TSpeciesIndexResponse, TSpeciesResponse>('compendia', pluralName),
  ...createNotableService(pluralName),
  ...createImageableService(pluralName),
  ...createQuestableService(pluralName),
  ...createEncounterableService(pluralName)
}

export default SpeciesService