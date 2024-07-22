import { createChildDataManager, TUseChildDataManager } from '../createChildDataManager'
import { TCampaign, TSpell, TCompendium } from '../../../types'
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
import SpellService, { TSpellRequest } from '../../../services/ApiService/Compendia/SpellService'
import { spellSlice } from '../../../reducers/compendium/spell/spellSlice'

type TUseSpellDataManager = TUseChildDataManager<TCampaign, TSpell, TSpellRequest> & {
  compendium?: TCompendium,
  spell?: TSpell,
} & hasImageableDataManager & hasNotesAttachableDataManager & hasQuestsAttachableDataManager & hasEncountersAttachableDataManager

const useSpellDataManager = (): TUseSpellDataManager => {
  const manager = useMemo(() => createChildDataManager(
    'spell',
    'campaign',
    spellSlice,
    campaignSlice,
    SpellService,
  ), [])
  return {
    ...manager,
    compendium: manager.parent,
    spell: manager.entity,
    notes: useMemo(() => createNotableDataManager(spellSlice, SpellService.notes), []),
    quests: useMemo(() => createQuestableDataManager(spellSlice, SpellService.quests), []),
    encounters: useMemo(() => createEncounterableDataManager(spellSlice, SpellService.encounters), []),
    images: useMemo(() => createImageableDataManager(spellSlice, SpellService.images), [])
  }
}

export default useSpellDataManager;