import { TLocationType } from '../../../types'
import { createApiService } from '../createApiService'

type TLocationTypeIndexResponse = TLocationType[];

const LocationTypeService = createApiService<{}, TLocationTypeIndexResponse, TLocationType>('location-types');

export default LocationTypeService