import { TReligion } from '../../../types'
import { createChildApiService } from '../createApiService'
import { createImageableService } from '../createImageableService'
import { createNotableService } from '../createNotableService'
import { createQuestableService } from '../createQuestableService'
import { createEncounterableService } from '../createEncounterableService'

export interface TReligionRequest {
  name: string;
  content: string;
}

type TReligionResponse = TReligion;

type TReligionIndexResponse = TReligion[];

const pluralName = 'religions'

const ReligionService = {
  ...createChildApiService<TReligionRequest, TReligionIndexResponse, TReligionResponse>('compendia', pluralName),
  ...createNotableService(pluralName),
  ...createImageableService(pluralName),
  ...createQuestableService(pluralName),
  ...createEncounterableService(pluralName)
}

export default ReligionService