import { useChildDataManager, TChildDataManager } from '../useChildDataManager'
import { TSpell, TCompendium } from '../../../types'
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
import SpellService, { TSpellRequest } from '../../../services/ApiService/Compendia/SpellService'
import { spellSlice } from '../../../reducers/compendium/spell/spellSlice'
import { compendiaIndexSlice } from '@/reducers/compendium/compendiaIndexSlice'

export type TSpellDataManager = TChildDataManager<TCompendium, TSpell, TSpellRequest> & {
  compendium?: TCompendium,
  spell?: TSpell,
} & hasImageableDataManager & hasNotesAttachableDataManager & hasQuestsAttachableDataManager & hasEncountersAttachableDataManager

const useSpellDataManager = (compendiumId?: number, id?: number): TSpellDataManager => {
  const manager = useChildDataManager(
    'spells',
    'compendia',
    compendiumId,
    id,
    compendiaIndexSlice,
    SpellService,
  )
  return {
    ...manager,
    compendium: manager.parent,
    spell: manager.entity,
    notes: useNotableDataManager(manager, SpellService.notes),
    quests: useQuestableDataManager(manager, SpellService.quests),
    encounters: useEncounterableDataManager(manager, SpellService.encounters),
    images: useImageableDataManager(manager, SpellService.images)
  }
}

export default useSpellDataManager;