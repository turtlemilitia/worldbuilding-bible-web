import { TQuest } from '@/types'
import { createChildApiService } from '../createApiService'
import { createNotableService } from '../createNotableService'
import { createImageableService } from '../createImageableService'

export type TQuestRequest = {
  name: string;
  typeId: number;
  content: string;
  parentId?: number;
  completedAt?: string|null;
}

export type TQuestResponse = TQuest

export type TQuestIndexResponse = TQuest[];

const QuestService = {
  ...createChildApiService<TQuestRequest, TQuestIndexResponse, TQuestResponse> ('campaigns', 'quests'),
  ...createNotableService('quests'),
  ...createImageableService('quests')
}

export default QuestService