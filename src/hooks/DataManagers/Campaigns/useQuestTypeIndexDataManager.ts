import { TQuestType } from '../../../types'
import { createIndexDataManager, TIndexDataManager } from '../createIndexDataManager'
import { questTypesIndexSlice } from '../../../reducers/questType/questTypesIndexSlice'
import QuestTypeService from '../../../services/ApiService/Campaigns/QuestTypeService'

type TQuestTypeIndexDataManager = TIndexDataManager<TQuestType> & {
  questTypes?: TQuestType[]
}

const useQuestTypeIndexDataManager = (): TQuestTypeIndexDataManager => {
  const manager = createIndexDataManager(
    'questTypes',
    questTypesIndexSlice,
    QuestTypeService,
  )
  return {
    ...manager,
    questTypes: manager.list,
  }
}

export default useQuestTypeIndexDataManager