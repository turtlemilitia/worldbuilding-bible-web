import { TLocationType } from '../../../types'
import { createIndexDataManager, TIndexDataManager } from '../createIndexDataManager'
import LocationTypeService from '../../../services/ApiService/Compendia/LocationTypeService'
import { locationTypesIndexSlice } from '../../../reducers/locationType/locationTypesIndexSlice'

type TLocationTypeIndexDataManager = TIndexDataManager<TLocationType> & {
  locationTypes?: TLocationType[]
}

const useLocationTypeIndexDataManager = (): TLocationTypeIndexDataManager => {
  const manager = createIndexDataManager(
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