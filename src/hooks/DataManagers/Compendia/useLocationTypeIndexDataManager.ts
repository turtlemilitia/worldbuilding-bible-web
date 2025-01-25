import { TLocationType } from '../../../types'
import { useIndexDataManager, TIndexDataManager } from '../useIndexDataManager'
import LocationTypeService from '../../../services/ApiService/Compendia/LocationTypeService'
import { locationTypesIndexSlice } from '../../../reducers/locationType/locationTypesIndexSlice'

export type TLocationTypeIndexDataManager = TIndexDataManager<TLocationType> & {
  locationTypes?: TLocationType[]
}

const useLocationTypeIndexDataManager = (): TLocationTypeIndexDataManager => {
  const manager = useIndexDataManager(
    'locationTypes',
    locationTypesIndexSlice,
    LocationTypeService,
  )
  return {
    ...manager,
    locationTypes: manager.list,
  }
}

export default useLocationTypeIndexDataManager