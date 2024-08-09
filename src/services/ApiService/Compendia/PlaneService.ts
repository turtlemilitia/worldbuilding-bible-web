import { TPlane } from '../../../types'
import { createChildApiService } from '../createApiService'
import { createImageableService } from '../createImageableService'
import { createNotableService } from '../createNotableService'
import { createQuestableService } from '../createQuestableService'
import { createEncounterableService } from '../createEncounterableService'

export interface TPlaneRequest {
  name: string;
  content: string;
}

type TPlaneResponse = TPlane;

type TPlaneIndexResponse = TPlane[];

const pluralName = 'planes'

const PlaneService = {
  ...createChildApiService<TPlaneRequest, TPlaneIndexResponse, TPlaneResponse>('compendia', pluralName),
  ...createNotableService(pluralName),
  ...createImageableService(pluralName),
  ...createQuestableService(pluralName),
  ...createEncounterableService(pluralName)
}

export default PlaneService