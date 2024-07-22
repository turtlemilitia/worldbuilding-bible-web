import { createChildDataManager, TUseChildDataManager } from '../createChildDataManager'
import { TCampaign, TFaction, TCompendium } from '../../../types'
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
import { campaignSlice } from '../../../reducers/campaign/campaignSlice'
import FactionService, { TFactionRequest } from '../../../services/ApiService/Compendia/FactionService'
import { factionSlice } from '../../../reducers/compendium/faction/factionSlice'

type TUseFactionDataManager = TUseChildDataManager<TCampaign, TFaction, TFactionRequest> & {
  compendium?: TCompendium,
  faction?: TFaction,
} & hasImageableDataManager & hasNotesAttachableDataManager & hasQuestsAttachableDataManager & hasEncountersAttachableDataManager

const useFactionDataManager = (): TUseFactionDataManager => {
  const manager = useMemo(() => createChildDataManager(
    'faction',
    'campaign',
    factionSlice,
    campaignSlice,
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