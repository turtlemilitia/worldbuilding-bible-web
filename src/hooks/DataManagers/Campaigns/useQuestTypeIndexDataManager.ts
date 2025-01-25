import { TQuestType } from '../../../types'
import { useIndexDataManager, TIndexDataManager } from '../useIndexDataManager'
import { questTypesIndexSlice } from '../../../reducers/questType/questTypesIndexSlice'
import QuestTypeService from '../../../services/ApiService/Campaigns/QuestTypeService'

export type TQuestTypeIndexDataManager = TIndexDataManager<TQuestType> & {
  questTypes?: TQuestType[]
}

const useQuestTypeIndexDataManager = (): TQuestTypeIndexDataManager => {
  const manager = useIndexDataManager(
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