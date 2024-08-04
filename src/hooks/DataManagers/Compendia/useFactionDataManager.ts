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

type TFactionDataManager = TChildDataManager<TCompendium, TFaction, TFactionRequest> & {
  compendium?: TCompendium,
  faction?: TFaction,
} & hasImageableDataManager & hasNotesAttachableDataManager & hasQuestsAttachableDataManager & hasEncountersAttachableDataManager

const useFactionDataManager = (): TFactionDataManager => {
  const manager = useChildDataManager(
    'faction',
    'compendium',
    factionSlice,
    compendiumSlice,
    FactionService,
  )
  return {
    ...manager,
    compendium: manager.parent,
    faction: manager.entity,
    notes: useNotableDataManager(factionSlice, FactionService.notes),
    quests: useQuestableDataManager(factionSlice, FactionService.quests),
    encounters: useEncounterableDataManager(factionSlice, FactionService.encounters),
    images: useImageableDataManager(factionSlice, FactionService.images)
  }
}

export default useFactionDataManager;