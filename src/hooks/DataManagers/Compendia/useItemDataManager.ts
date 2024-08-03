import { createChildDataManager, TChildDataManager } from '../createChildDataManager'
import { TItem, TCompendium } from '../../../types'
import {
  createEncounterableDataManager,
  createNotableDataManager,
  createQuestableDataManager,
  hasEncountersAttachableDataManager,
  hasNotesAttachableDataManager,
  hasQuestsAttachableDataManager
} from '../createAttachableDataManager'
import { createImageableDataManager, hasImageableDataManager } from '../createImageableDataManager'
import { useMemo } from 'react'
import { compendiumSlice } from '../../../reducers/compendium/compendiumSlice'
import ItemService, { TItemRequest } from '../../../services/ApiService/Compendia/ItemService'
import { itemSlice } from '../../../reducers/compendium/item/itemSlice'

type TItemDataManager = TChildDataManager<TCompendium, TItem, TItemRequest> & {
  compendium?: TCompendium,
  item?: TItem,
} & hasImageableDataManager & hasNotesAttachableDataManager & hasQuestsAttachableDataManager & hasEncountersAttachableDataManager

const useItemDataManager = (): TItemDataManager => {
  const manager = useMemo(() => createChildDataManager(
    'item',
    'compendium',
    itemSlice,
    compendiumSlice,
    ItemService,
  ), [])
  return {
    ...manager,
    compendium: manager.parent,
    item: manager.entity,
    notes: useMemo(() => createNotableDataManager(itemSlice, ItemService.notes), []),
    quests: useMemo(() => createQuestableDataManager(itemSlice, ItemService.quests), []),
    encounters: useMemo(() => createEncounterableDataManager(itemSlice, ItemService.encounters), []),
    images: useMemo(() => createImageableDataManager(itemSlice, ItemService.images), [])
  }
}

export default useItemDataManager;