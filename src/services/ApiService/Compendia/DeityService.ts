import { TDeity } from '../../../types'

import { createChildApiService } from '../createApiService'
import { createImageableService } from '../createImageableService'
import { createNotableService } from '../createNotableService'
import { createQuestableService } from '../createQuestableService'
import { createEncounterableService } from '../createEncounterableService'

export interface TDeityRequest {
  name: string;
  content: string;
}
type TDeityResponse = TDeity;

type TDeityIndexResponse = TDeity[];

const pluralName = 'deities'

const DeityService = {
  ...createChildApiService<TDeityRequest, TDeityIndexResponse, TDeityResponse>('compendia', pluralName),
  ...createNotableService(pluralName),
  ...createImageableService(pluralName),
  ...createQuestableService(pluralName),
  ...createEncounterableService(pluralName)
}

export default DeityService