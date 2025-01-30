import { TLocationGovernmentType } from '@/types'
import { useIndexDataManager, TIndexDataManager } from '../useIndexDataManager'
import GovernmentTypeService from '../../../services/ApiService/Compendia/GovernmentTypeService'
import { governmentTypesIndexSlice } from '@/reducers/governmentType/governmentTypesIndexSlice'

export type TGovernmentTypeIndexDataManager = TIndexDataManager<TLocationGovernmentType> & {
  governmentTypes?: TLocationGovernmentType[]
}

const useGovernmentTypeIndexDataManager = (): TGovernmentTypeIndexDataManager => {
  const manager = useIndexDataManager(
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