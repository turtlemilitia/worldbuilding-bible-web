import { TPin } from '../../types'
import { createAttachableService, TAttachableApi } from './createAttachableService'

export interface TPinAttachRequest {
  pinnableType: string,
  pinnableId: number,
}

export type TPinAttachResponse = TPin

export type TPinnableApi = { pins: TAttachableApi<TPinAttachRequest, TPinAttachResponse> }

export const createPinnableService = (parentPluralName: 'users' | 'campaigns'): TPinnableApi => ({
  pins: createAttachableService<TPinAttachRequest, TPinAttachResponse>('pinnable', parentPluralName, 'pins')
})