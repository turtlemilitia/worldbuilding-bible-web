import { TSystem } from '../../../types'
import SystemService from '../../../services/ApiService/Systems/SystemService'
import { systemsIndexSlice } from '../../../reducers/system/systemsIndexSlice'
import { useIndexDataManager, TIndexDataManager } from '../useIndexDataManager'

type TSystemIndexDataManager = TIndexDataManager<TSystem> & {
  systems?: TSystem[]
}

const useSystemIndexDataManager = (): TSystemIndexDataManager => {
  const manager = useIndexDataManager(
    'systems',
    systemsIndexSlice,
    SystemService,
  )
  return {
    ...manager,
    systems: manager.list,
  }
}

export default useSystemIndexDataManager