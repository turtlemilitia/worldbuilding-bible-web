import { useDataManager, TDataManager } from '../useDataManager'
import { compendiumSlice } from '../../../reducers/compendium/compendiumSlice'
import { compendiaIndexSlice } from '../../../reducers/compendium/compendiaIndexSlice'
import compendiumService, { TCompendiumRequest } from '../../../services/ApiService/Compendia/CompendiumService'
import { TCompendium } from '../../../types'
import { useAttachableDataManager, hasNotesAttachableDataManager } from '../useAttachableDataManager'
import { useImageableDataManager, hasImageableDataManager } from '../useImageableDataManager'

type TCompendiumDataManager = TDataManager<TCompendium, TCompendiumRequest> & {
  compendium?: TCompendium
} & hasNotesAttachableDataManager & hasImageableDataManager
const useCompendiumDataManager = (): TCompendiumDataManager => {
  const manager = useDataManager(
    'compendium',
    compendiumSlice,
    compendiaIndexSlice,
    compendiumService
  )
  return {
    ...manager,
    compendium: manager.entity,
    isPermanent: true,
    notes: useAttachableDataManager('notes', compendiumSlice, compendiumService.notes),
    images: useImageableDataManager(compendiumSlice, compendiumService.images)
  }
}

export default useCompendiumDataManager