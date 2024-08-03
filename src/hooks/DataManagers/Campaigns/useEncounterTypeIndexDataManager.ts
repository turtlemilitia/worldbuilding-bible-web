import { TEncounterType } from '../../../types'
import { createIndexDataManager, TIndexDataManager } from '../createIndexDataManager'
import { encounterTypesIndexSlice } from '../../../reducers/encounterType/encounterTypesIndexSlice'
import EncounterTypeService from '../../../services/ApiService/Campaigns/EncounterTypeService'

type TEncounterTypeIndexDataManager = TIndexDataManager<TEncounterType> & {
  encounterTypes?: TEncounterType[]
}

const useEncounterTypeIndexDataManager = (): TEncounterTypeIndexDataManager => {
  const manager = createIndexDataManager(
    'encounterTypes',
    encounterTypesIndexSlice,
    EncounterTypeService,
  )
  return {
    ...manager,
    encounterTypes: manager.list,
  }
}

export default useEncounterTypeIndexDataManager