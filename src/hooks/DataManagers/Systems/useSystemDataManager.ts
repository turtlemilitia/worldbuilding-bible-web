import { createDataManager, TUseDataManager } from '../createDataManager'
import { systemSlice } from '../../../reducers/system/systemSlice'
import { systemsIndexSlice } from '../../../reducers/system/systemsIndexSlice'
import systemService, { TSystemRequest } from '../../../services/ApiService/Systems/SystemService'
import { TSystem } from '../../../types'
import { createImageableDataManager, hasImageableDataManager } from '../createImageableDataManager'
import { useMemo } from 'react'

type TUseSystemDataManager = TUseDataManager<TSystem, TSystemRequest> & {
  system?: TSystem
} & hasImageableDataManager
const useSystemDataManager = (): TUseSystemDataManager => {
  const manager = createDataManager(
    'system',
    systemSlice,
    systemsIndexSlice,
    systemService
  )
  return {
    system: manager.entity,
    ...manager,
    images: useMemo(() => createImageableDataManager(systemSlice, systemService.images), [])
  }
}

export default useSystemDataManager