import { TQuestType } from '../../../types'
import { createApiService } from '../createApiService'

type TQuestTypeIndexResponse = TQuestType[];

const QuestTypeService = createApiService<{}, TQuestTypeIndexResponse, TQuestType>('quest-types');

export default QuestTypeService