import { TLocationGovernmentType } from '../../../types'
import { createApiService } from '../createApiService'

type TGovernmentTypeIndexResponse = TLocationGovernmentType[];

const GovernmentTypeService = createApiService<{}, TGovernmentTypeIndexResponse, TLocationGovernmentType>('government-types')

export default GovernmentTypeService