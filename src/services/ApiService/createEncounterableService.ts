import { TEncounter } from '../../types'
import { createAttachableService, TAttachableApi } from './createAttachableService'

export interface TEncounterAttachRequest {
  encounterId: number | string,
}

export type TEncounterAttachResponse = TEncounter

export type TEncounterableApi = { encounters: TAttachableApi<TEncounterAttachRequest, TEncounterAttachResponse> }

export const createEncounterableService = (parentPluralName: string): TEncounterableApi => ({
  encounters: createAttachableService<TEncounterAttachRequest, TEncounterAttachResponse>('encounter', parentPluralName, 'encounters')
})