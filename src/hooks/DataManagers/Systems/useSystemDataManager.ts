import { useDataManager, TDataManager } from '../useDataManager'
import { systemsIndexSlice } from '@/reducers/system/systemsIndexSlice'
import systemService, { TSystemRequest } from '../../../services/ApiService/Systems/SystemService'
import { TSystem } from '@/types'
import { useImageableDataManager, hasImageableDataManager } from '@/hooks/DataManagers'

export type TSystemDataManager = TDataManager<TSystem, TSystemRequest> & {
  system?: TSystem
} & hasImageableDataManager
const useSystemDataManager = (id?: number): TSystemDataManager => {
  const manager = useDataManager(
    'systems',
    id,
    systemsIndexSlice,
    systemService
  )
  return {
    system: manager.entity,
    ...manager,
    images: useImageableDataManager(manager, systemService.images)
  }
}

export default useSystemDataManager