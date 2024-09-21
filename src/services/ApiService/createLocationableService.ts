import { TLocation } from '../../types'
import { createAttachableService, TAttachableApi } from './createAttachableService'

export interface TLocationAttachRequest {
  locationId: number | string,
}

export type TLocationAttachResponse = TLocation

export type TLocationableApi = { locations: TAttachableApi<TLocationAttachRequest, TLocationAttachResponse> }

export const createLocationableService = (parentPluralName: string): TLocationableApi => ({
  locations: createAttachableService<TLocationAttachRequest, TLocationAttachResponse>('location', parentPluralName, 'locations')
})