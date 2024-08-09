import { AxiosResponse } from 'axios'
import { TLocation, TLocationGovernmentType, TLocationType } from '../../../types'
import api from '../../../api'
import { createChildApiService } from '../createApiService'
import { createImageableService } from '../createImageableService'
import { createNotableService } from '../createNotableService'
import { createQuestableService } from '../createQuestableService'
import { createEncounterableService } from '../createEncounterableService'

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
  ...createNotableService(pluralName),
  ...createImageableService(pluralName),
  ...createQuestableService(pluralName),
  ...createEncounterableService(pluralName),
  attachToCharacter: (slug: string, locationId: number): Promise<AxiosResponse<TLocationResponse>> => {
    return api.post(`/api/characters/${slug}/locations`, { locationId })
  },
  detachFromCharacter: (slug: string, locationSlug: string): Promise<AxiosResponse<{}>> => {
    return api.delete(`/api/characters/${slug}/locations/${locationSlug}`)
  }
}

export default LocationService