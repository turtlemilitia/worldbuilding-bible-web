import { createChildDataManager, TChildDataManager } from '../createChildDataManager'
import { TFaction, TCompendium } from '../../../types'
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
import FactionService, { TFactionRequest } from '../../../services/ApiService/Compendia/FactionService'
import { factionSlice } from '../../../reducers/compendium/faction/factionSlice'

type TFactionDataManager = TChildDataManager<TCompendium, TFaction, TFactionRequest> & {
  compendium?: TCompendium,
  faction?: TFaction,
} & hasImageableDataManager & hasNotesAttachableDataManager & hasQuestsAttachableDataManager & hasEncountersAttachableDataManager

const useFactionDataManager = (): TFactionDataManager => {
  const manager = useMemo(() => createChildDataManager(
    'faction',
    'compendium',
    factionSlice,
    compendiumSlice,
    FactionService,
  ), [])
  return {
    ...manager,
    compendium: manager.parent,
    faction: manager.entity,
    notes: useMemo(() => createNotableDataManager(factionSlice, FactionService.notes), []),
    quests: useMemo(() => createQuestableDataManager(factionSlice, FactionService.quests), []),
    encounters: useMemo(() => createEncounterableDataManager(factionSlice, FactionService.encounters), []),
    images: useMemo(() => createImageableDataManager(factionSlice, FactionService.images), [])
  }
}

export default useFactionDataManager;