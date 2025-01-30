import { useChildDataManager, TChildDataManager } from '../useChildDataManager'
import { TFaction, TCompendium } from '../../../types'
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
import FactionService, { TFactionRequest } from '../../../services/ApiService/Compendia/FactionService'
import { factionSlice } from '../../../reducers/compendium/faction/factionSlice'
import { compendiaIndexSlice } from '@/reducers/compendium/compendiaIndexSlice'

export type TFactionDataManager = TChildDataManager<TCompendium, TFaction, TFactionRequest> & {
  compendium?: TCompendium,
  faction?: TFaction,
} & hasImageableDataManager & hasNotesAttachableDataManager & hasQuestsAttachableDataManager & hasEncountersAttachableDataManager

const useFactionDataManager = (compendiumId?: number, id?: number): TFactionDataManager => {
  const manager = useChildDataManager(
    'factions',
    'compendia',
    compendiumId,
    id,
    compendiaIndexSlice,
    FactionService,
  )
  return {
    ...manager,
    compendium: manager.parent,
    faction: manager.entity,
    notes: useNotableDataManager(manager, FactionService.notes),
    quests: useQuestableDataManager(manager, FactionService.quests),
    encounters: useEncounterableDataManager(manager, FactionService.encounters),
    images: useImageableDataManager(manager, FactionService.images)
  }
}

export default useFactionDataManager;