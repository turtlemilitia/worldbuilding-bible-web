import { AxiosResponse } from 'axios'
import { TNaturalResource } from '../../../types'
import api from '../../../api'
import { createChildApiService } from '../createApiService'
import { createImageableService } from '../createImageableService'
import { createNotableService } from '../createNotableService'
import { createQuestableService } from '../createQuestableService'
import { createEncounterableService } from '../createEncounterableService'

export interface TNaturalResourceRequest {
  name: string;
  content: string;
}

type TNaturalResourceResponse = TNaturalResource;

type TNaturalResourceIndexResponse = TNaturalResource[];

const pluralName = 'natural-resources'

const NaturalResourceService = {
  ...createChildApiService<TNaturalResourceRequest, TNaturalResourceIndexResponse, TNaturalResourceResponse>('compendia', pluralName),
  ...createNotableService(pluralName),
  ...createImageableService(pluralName),
  ...createQuestableService(pluralName),
  ...createEncounterableService(pluralName),
  attachToCharacter: (slug: string, naturalResourceId: number): Promise<AxiosResponse<TNaturalResourceResponse>> => {
    return api.post(`/api/characters/${slug}/natural-resources`, { naturalResourceId })
  },
  detachFromCharacter: (slug: string, naturalResourceSlug: string): Promise<AxiosResponse<{}>> => {
    return api.delete(`/api/characters/${slug}/natural-resources/${naturalResourceSlug}`)
  }
}

export default NaturalResourceService