import { TCompendium } from '../../../types'
import CompendiumService from '../../../services/ApiService/Compendia/CompendiumService'
import { compendiaIndexSlice } from '../../../reducers/compendium/compendiaIndexSlice'
import { createIndexDataManager, TIndexDataManager } from '../createIndexDataManager'

type TCompendiumIndexDataManager = TIndexDataManager<TCompendium> & {
  compendia?: TCompendium[]
}

const useCompendiumIndexDataManager = (): TCompendiumIndexDataManager => {
  const manager = createIndexDataManager(
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