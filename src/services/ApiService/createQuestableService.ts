import { TQuest } from '../../types'
import { createAttachableService, TAttachableApi } from './createAttachableService'

export interface TQuestAttachRequest {
  questId: number | string,
}

export type TQuestAttachResponse = TQuest

export type TQuestableApi = { quests: TAttachableApi<TQuestAttachRequest, TQuestAttachResponse> }

export const createQuestableService = (parentPluralName: string): TQuestableApi => ({
  quests: createAttachableService<TQuestAttachRequest, TQuestAttachResponse>('quest', parentPluralName, 'quests')
})