import { useDataManager, TDataManager } from '../useDataManager'
import { systemSlice } from '../../../reducers/system/systemSlice'
import { systemsIndexSlice } from '../../../reducers/system/systemsIndexSlice'
import systemService, { TSystemRequest } from '../../../services/ApiService/Systems/SystemService'
import { TSystem } from '../../../types'
import { useImageableDataManager, hasImageableDataManager } from '../useImageableDataManager'

type TSystemDataManager = TDataManager<TSystem, TSystemRequest> & {
  system?: TSystem
} & hasImageableDataManager
const useSystemDataManager = (): TSystemDataManager => {
  const manager = useDataManager(
    'system',
    systemSlice,
    systemsIndexSlice,
    systemService
  )
  return {
    system: manager.entity,
    ...manager,
    images: useImageableDataManager(systemSlice, systemService.images)
  }
}

export default useSystemDataManager