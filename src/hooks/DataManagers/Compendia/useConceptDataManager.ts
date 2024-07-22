import { createChildDataManager, TUseChildDataManager } from '../createChildDataManager'
import { TCampaign, TConcept, TCompendium } from '../../../types'
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
import ConceptService, { TConceptRequest } from '../../../services/ApiService/Compendia/ConceptService'
import { conceptSlice } from '../../../reducers/compendium/concept/conceptSlice'

type TUseConceptDataManager = TUseChildDataManager<TCampaign, TConcept, TConceptRequest> & {
  compendium?: TCompendium,
  concept?: TConcept,
} & hasImageableDataManager & hasNotesAttachableDataManager & hasQuestsAttachableDataManager & hasEncountersAttachableDataManager

const useConceptDataManager = (): TUseConceptDataManager => {
  const manager = useMemo(() => createChildDataManager(
    'concept',
    'campaign',
    conceptSlice,
    campaignSlice,
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