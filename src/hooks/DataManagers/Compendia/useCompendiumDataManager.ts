import { useDataManager, TDataManager } from '../useDataManager'
import { compendiaIndexSlice } from '@/reducers/compendium/compendiaIndexSlice'
import compendiumService, { TCompendiumRequest } from '../../../services/ApiService/Compendia/CompendiumService'
import { TCompendium } from '@/types'
import { useAttachableDataManager, hasNotesAttachableDataManager } from '@/hooks/DataManagers'
import { useImageableDataManager, hasImageableDataManager } from '@/hooks/DataManagers'
import useAuthUserDataManager from '../useAuthUserDataManager'

export type TCompendiumDataManager = TDataManager<TCompendium, TCompendiumRequest> & {
  compendium?: TCompendium,
  ownsCompendium: boolean
} & hasNotesAttachableDataManager & hasImageableDataManager
const useCompendiumDataManager = (id?: number): TCompendiumDataManager => {
  const { user: authUser } = useAuthUserDataManager()
  const manager = useDataManager(
    'compendia',
    id,
    compendiaIndexSlice,
    compendiumService
  )
  return {
    ...manager,
    compendium: manager.entity,
    isPermanent: true,
    ownsCompendium: !!authUser && !!manager.entity && (authUser?.id === manager.entity?.creator?.id),
    notes: useAttachableDataManager('notes', manager, compendiumService.notes),
    images: useImageableDataManager(manager, compendiumService.images)
  }
}

export default useCompendiumDataManager