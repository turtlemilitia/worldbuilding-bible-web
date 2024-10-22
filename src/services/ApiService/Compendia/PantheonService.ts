import { TPantheon } from '@/types'
import { createChildApiService } from '../createApiService'
import { createNotableService } from '../createNotableService'
import { createImageableService } from '../createImageableService'
import { createQuestableService } from '../createQuestableService'
import { createEncounterableService } from '../createEncounterableService'

export interface TPantheonRequest {
  name: string;
  content: string;
  religionId?: number;
}
type TPantheonResponse = TPantheon;

type TPantheonIndexResponse = TPantheon[];

const pluralName = 'pantheons'

const PantheonService = {
  ...createChildApiService<TPantheonRequest, TPantheonIndexResponse, TPantheonResponse>('compendia', pluralName),
  ...createNotableService(pluralName),
  ...createImageableService(pluralName),
  ...createQuestableService(pluralName),
  ...createEncounterableService(pluralName)
}

export default PantheonService