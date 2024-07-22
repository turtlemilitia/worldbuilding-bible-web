import { TEncounterType } from '../../../types'
import { createApiService } from '../createApiService'

type TEncounterTypeIndexResponse = {
  data: TEncounterType[];
}

const EncounterTypeService = createApiService<{}, TEncounterTypeIndexResponse, TEncounterType>('encounter-types');

export default EncounterTypeService