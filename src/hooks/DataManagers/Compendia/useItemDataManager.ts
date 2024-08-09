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

type TItemDataManager = TChildDataManager<TCompendium, TItem, TItemRequest> & {
  compendium?: TCompendium,
  item?: TItem,
} & hasImageableDataManager & hasNotesAttachableDataManager & hasQuestsAttachableDataManager & hasEncountersAttachableDataManager

const useItemDataManager = (): TItemDataManager => {
  const manager = useChildDataManager(
    'item',
    'compendium',
    itemSlice,
    compendiumSlice,
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