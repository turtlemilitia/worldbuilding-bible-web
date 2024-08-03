import { createChildDataManager, TChildDataManager } from '../createChildDataManager'
import { TSpell, TCompendium } from '../../../types'
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
import SpellService, { TSpellRequest } from '../../../services/ApiService/Compendia/SpellService'
import { spellSlice } from '../../../reducers/compendium/spell/spellSlice'

type TSpellDataManager = TChildDataManager<TCompendium, TSpell, TSpellRequest> & {
  compendium?: TCompendium,
  spell?: TSpell,
} & hasImageableDataManager & hasNotesAttachableDataManager & hasQuestsAttachableDataManager & hasEncountersAttachableDataManager

const useSpellDataManager = (): TSpellDataManager => {
  const manager = useMemo(() => createChildDataManager(
    'spell',
    'compendium',
    spellSlice,
    compendiumSlice,
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