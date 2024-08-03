import { TLocationGovernmentType } from '../../../types'
import { createIndexDataManager, TIndexDataManager } from '../createIndexDataManager'
import GovernmentTypeService from '../../../services/ApiService/Compendia/GovernmentTypeService'
import { governmentTypesIndexSlice } from '../../../reducers/governmentType/governmentTypesIndexSlice'

type TGovernmentTypeIndexDataManager = TIndexDataManager<TLocationGovernmentType> & {
  governmentTypes?: TLocationGovernmentType[]
}

const useGovernmentTypeIndexDataManager = (): TGovernmentTypeIndexDataManager => {
  const manager = createIndexDataManager(
    'governmentTypes',
    governmentTypesIndexSlice,
    GovernmentTypeService,
  )
  return {
    ...manager,
    governmentTypes: manager.list,
  }
}

export default useGovernmentTypeIndexDataManager