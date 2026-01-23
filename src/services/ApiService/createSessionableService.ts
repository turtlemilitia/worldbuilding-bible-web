import { TSession } from '../../types'
import { createAttachableService, TAttachableApi } from './createAttachableService'

export interface TSessionAttachRequest {
  sessionId: number | string,
}

export type TSessionAttachResponse = TSession

export type TSessionableApi = { sessions: TAttachableApi<TSessionAttachRequest, TSessionAttachResponse> }

export const createSessionableService = (parentPluralName: string): TSessionableApi => ({
  sessions: createAttachableService<TSessionAttachRequest, TSessionAttachResponse>('session', parentPluralName, 'sessions')
})