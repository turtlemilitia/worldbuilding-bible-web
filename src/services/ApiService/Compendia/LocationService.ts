import { TLocation, TLocationGovernmentType, TLocationType } from '../../../types'
import { createChildApiService } from '../createApiService'
import { createImageableService } from '../createImageableService'
import { createNotableService } from '../createNotableService'
import { createQuestableService } from '../createQuestableService'
import { createEncounterableService } from '../createEncounterableService'
import { createSceneableService } from '../createSceneableService'
import {createCharacterableService} from "../createCharacterableService";

export interface TLocationRequest {
  parentId: TLocation['id'];
  name: string;
  typeId: TLocationType['id'];
  content: string;
  demonym?: string;
  aliases?: string;
  population?: number;
  governmentTypeId?: TLocationGovernmentType['id'];
}

type TLocationResponse = TLocation;

type TLocationIndexResponse = TLocation[];

const pluralName = 'locations'

const LocationService = {
  ...createChildApiService<TLocationRequest, TLocationIndexResponse, TLocationResponse>('compendia', pluralName),
  ...createCharacterableService(pluralName),
  ...createNotableService(pluralName),
  ...createImageableService(pluralName),
  ...createQuestableService(pluralName),
  ...createEncounterableService(pluralName),
  ...createSceneableService(pluralName),
}

export default LocationService