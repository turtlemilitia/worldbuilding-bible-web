import { AxiosResponse } from 'axios'
import { TFaction } from '../../../types'
import api from '../../../api'
import { createChildApiService } from '../createApiService'
import { createImageableService } from '../createImageableService'
import { createNotableService } from '../createNotableService'
import { createQuestableService } from '../createQuestableService'
import { createEncounterableService } from '../createEncounterableService'

export interface TFactionRequest {
  name: string;
  content: string;
}

type TFactionResponse = TFaction;

type TFactionIndexResponse = TFaction[];

const pluralName = 'factions'

const FactionService = {
  ...createChildApiService<TFactionRequest, TFactionIndexResponse, TFactionResponse>('compendia', pluralName),
  ...createNotableService(pluralName),
  ...createImageableService(pluralName),
  ...createQuestableService(pluralName),
  ...createEncounterableService(pluralName),
  attachToCharacter: (slug: string, factionId: number): Promise<AxiosResponse<TFactionResponse>> => {
    return api.post(`/api/characters/${slug}/factions`, { factionId })
  },
  detachFromCharacter: (slug: string, factionSlug: string): Promise<AxiosResponse<{}>> => {
    return api.delete(`/api/characters/${slug}/factions/${factionSlug}`)
  }
}

export default FactionService