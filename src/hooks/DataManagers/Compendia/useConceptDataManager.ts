import { createChildDataManager, TChildDataManager } from '../createChildDataManager'
import { TConcept, TCompendium } from '../../../types'
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
import ConceptService, { TConceptRequest } from '../../../services/ApiService/Compendia/ConceptService'
import { conceptSlice } from '../../../reducers/compendium/concept/conceptSlice'

type TConceptDataManager = TChildDataManager<TCompendium, TConcept, TConceptRequest> & {
  compendium?: TCompendium,
  concept?: TConcept,
} & hasImageableDataManager & hasNotesAttachableDataManager & hasQuestsAttachableDataManager & hasEncountersAttachableDataManager

const useConceptDataManager = (): TConceptDataManager => {
  const manager = useMemo(() => createChildDataManager(
    'concept',
    'compendium',
    conceptSlice,
    compendiumSlice,
    ConceptService,
  ), [])
  return {
    ...manager,
    compendium: manager.parent,
    concept: manager.entity,
    notes: useMemo(() => createNotableDataManager(conceptSlice, ConceptService.notes), []),
    quests: useMemo(() => createQuestableDataManager(conceptSlice, ConceptService.quests), []),
    encounters: useMemo(() => createEncounterableDataManager(conceptSlice, ConceptService.encounters), []),
    images: useMemo(() => createImageableDataManager(conceptSlice, ConceptService.images), [])
  }
}

export default useConceptDataManager;