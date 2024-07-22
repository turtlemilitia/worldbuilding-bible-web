import { TNote } from '../../types'
import { createAttachableService, TAttachableApi } from './createAttachableService'

export interface TNoteAttachRequest {
  noteId: number | string,
}

export type TNoteAttachResponse = TNote

export type TNotableApi = { notes: TAttachableApi<TNoteAttachRequest, TNoteAttachResponse> }

export const createNotableService = (parentPluralName: string): TNotableApi => ({
  notes: createAttachableService<TNoteAttachRequest, TNoteAttachResponse>('note', parentPluralName, 'notes')
})