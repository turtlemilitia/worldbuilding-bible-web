import { createDataManager, TDataManager } from '../createDataManager'
import { compendiumSlice } from '../../../reducers/compendium/compendiumSlice'
import { compendiaIndexSlice } from '../../../reducers/compendium/compendiaIndexSlice'
import compendiumService, { TCompendiumRequest } from '../../../services/ApiService/Compendia/CompendiumService'
import { TCompendium } from '../../../types'
import { createAttachableDataManager, hasNotesAttachableDataManager } from '../createAttachableDataManager'
import { createImageableDataManager, hasImageableDataManager } from '../createImageableDataManager'
import { useMemo } from 'react'

type TCompendiumDataManager = TDataManager<TCompendium, TCompendiumRequest> & {
  compendium?: TCompendium
} & hasNotesAttachableDataManager & hasImageableDataManager
const useCompendiumDataManager = (): TCompendiumDataManager => {
  const manager = createDataManager(
    'compendium',
    compendiumSlice,
    compendiaIndexSlice,
    compendiumService
  )
  return {
    compendium: manager.entity,
    ...manager,
    notes: useMemo(() => createAttachableDataManager('notes', compendiumSlice, compendiumService.notes), []),
    images: useMemo(() => createImageableDataManager(compendiumSlice, compendiumService.images), [])
  }
}

export default useCompendiumDataManager