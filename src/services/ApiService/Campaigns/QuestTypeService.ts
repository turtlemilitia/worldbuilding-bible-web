import { TQuestType } from '../../../types'
import { createApiService } from '../createApiService'

type TQuestTypeIndexResponse = {
  data: TQuestType[];
}

const QuestTypeService = createApiService<{}, TQuestTypeIndexResponse, TQuestType>('quest-types');

export default QuestTypeService