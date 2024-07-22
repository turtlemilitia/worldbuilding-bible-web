import { TItem } from '../../../types'
import { createChildApiService } from '../createApiService'
import { createImageableService } from '../createImageableService'
import { createNotableService } from '../createNotableService'
import { createQuestableService } from '../createQuestableService'
import { createEncounterableService } from '../createEncounterableService'

export interface TItemRequest {
  name: string;
  content: string;
}

type TItemResponse = TItem;

type TItemIndexResponse = TItem[]

const pluralName = 'items'

const ItemService = {
  ...createChildApiService<TItemRequest, TItemIndexResponse, TItemResponse>('compendia', pluralName),
  ...createNotableService(pluralName),
  ...createImageableService(pluralName),
  ...createQuestableService(pluralName),
  ...createEncounterableService(pluralName)
}

export default ItemService