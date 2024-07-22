import { TLocationType } from '../../../types'
import { createApiService } from '../createApiService'

type TLocationTypeIndexResponse = {
  data: TLocationType[];
}

const LocationTypeService = createApiService<{}, TLocationTypeIndexResponse, TLocationType>('location-types');

export default LocationTypeService