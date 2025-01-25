import { TCompendium } from '../../../types'
import CompendiumService from '../../../services/ApiService/Compendia/CompendiumService'
import { compendiaIndexSlice } from '../../../reducers/compendium/compendiaIndexSlice'
import { useIndexDataManager, TIndexDataManager } from '../useIndexDataManager'

export type TCompendiumIndexDataManager = TIndexDataManager<TCompendium> & {
  compendia?: TCompendium[]
}

const useCompendiumIndexDataManager = (): TCompendiumIndexDataManager => {
  const manager = useIndexDataManager(
    'compendia',
    compendiaIndexSlice,
    CompendiumService,
  )
  return {
    ...manager,
    compendia: manager.list,
  }
}

export default useCompendiumIndexDataManager