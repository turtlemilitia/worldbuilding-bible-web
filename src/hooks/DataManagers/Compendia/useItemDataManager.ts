import { useChildDataManager, TChildDataManager } from '../useChildDataManager'
import { TItem, TCompendium } from '../../../types'
import {
  useEncounterableDataManager,
  useNotableDataManager,
  useQuestableDataManager,
  hasEncountersAttachableDataManager,
  hasNotesAttachableDataManager,
  hasQuestsAttachableDataManager
} from '../useAttachableDataManager'
import { useImageableDataManager, hasImageableDataManager } from '../useImageableDataManager'
import { compendiumSlice } from '../../../reducers/compendium/compendiumSlice'
import ItemService, { TItemRequest } from '../../../services/ApiService/Compendia/ItemService'
import { itemSlice } from '../../../reducers/compendium/item/itemSlice'
import { compendiaIndexSlice } from '@/reducers/compendium/compendiaIndexSlice'

export type TItemDataManager = TChildDataManager<TCompendium, TItem, TItemRequest> & {
  compendium?: TCompendium,
  item?: TItem,
} & hasImageableDataManager & hasNotesAttachableDataManager & hasQuestsAttachableDataManager & hasEncountersAttachableDataManager

const useItemDataManager = (compendiumId?: number, id?: number): TItemDataManager => {
  const manager = useChildDataManager(
    'items',
    'compendia',
    compendiumId,
    id,
    compendiaIndexSlice,
    ItemService,
  )
  return {
    ...manager,
    compendium: manager.parent,
    item: manager.entity,
    notes: useNotableDataManager(itemSlice, ItemService.notes),
    quests: useQuestableDataManager(itemSlice, ItemService.quests),
    encounters: useEncounterableDataManager(itemSlice, ItemService.encounters),
    images: useImageableDataManager(itemSlice, ItemService.images)
  }
}

export default useItemDataManager;