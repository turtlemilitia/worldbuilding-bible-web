import { TCurrency } from '../../../types'
import { createChildApiService } from '../createApiService'
import { createImageableService } from '../createImageableService'
import { createNotableService } from '../createNotableService'
import { createQuestableService } from '../createQuestableService'
import { createEncounterableService } from '../createEncounterableService'

export interface TCurrencyRequest {
  name: string;
  content: string;
}

type TCurrencyResponse = TCurrency;

type TCurrencyIndexResponse = TCurrency[];

const pluralName = 'currencies'

const CurrencyService = {
  ...createChildApiService<TCurrencyRequest, TCurrencyIndexResponse, TCurrencyResponse>('compendia', pluralName),
  ...createNotableService(pluralName),
  ...createImageableService(pluralName),
  ...createQuestableService(pluralName),
  ...createEncounterableService(pluralName)
}

export default CurrencyService