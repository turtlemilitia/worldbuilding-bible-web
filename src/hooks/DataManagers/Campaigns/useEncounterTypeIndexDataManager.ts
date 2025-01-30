import { TEncounterType } from '@/types'
import { useIndexDataManager, TIndexDataManager } from '../useIndexDataManager'
import { encounterTypesIndexSlice } from '@/reducers/encounterType/encounterTypesIndexSlice'
import EncounterTypeService from '../../../services/ApiService/Campaigns/EncounterTypeService'

export type TEncounterTypeIndexDataManager = TIndexDataManager<TEncounterType> & {
  encounterTypes?: TEncounterType[]
}

const useEncounterTypeIndexDataManager = (): TEncounterTypeIndexDataManager => {
  const manager = useIndexDataManager(
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