import { TFaction } from '../../types'
import { createAttachableService, TAttachableApi } from './createAttachableService'

export interface TFactionAttachRequest {
  factionId: number | string,
}

export type TFactionAttachResponse = TFaction

export type TFactionableApi = { factions: TAttachableApi<TFactionAttachRequest, TFactionAttachResponse> }

export const createFactionableService = (parentPluralName: string): TFactionableApi => ({
  factions: createAttachableService<TFactionAttachRequest, TFactionAttachResponse>('faction', parentPluralName, 'factions')
})