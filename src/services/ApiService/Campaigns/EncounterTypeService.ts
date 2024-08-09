import { TEncounterType } from '../../../types'
import { createApiService } from '../createApiService'

type TEncounterTypeIndexResponse = TEncounterType[];

const EncounterTypeService = createApiService<{}, TEncounterTypeIndexResponse, TEncounterType>('encounter-types');

export default EncounterTypeService