import { useChildDataManager, TChildDataManager } from '../useChildDataManager'
import { TConcept, TCompendium } from '../../../types'
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
import ConceptService, { TConceptRequest } from '../../../services/ApiService/Compendia/ConceptService'
import { conceptSlice } from '../../../reducers/compendium/concept/conceptSlice'

type TConceptDataManager = TChildDataManager<TCompendium, TConcept, TConceptRequest> & {
  compendium?: TCompendium,
  concept?: TConcept,
} & hasImageableDataManager & hasNotesAttachableDataManager & hasQuestsAttachableDataManager & hasEncountersAttachableDataManager

const useConceptDataManager = (): TConceptDataManager => {
  const manager = useChildDataManager(
    'concept',
    'compendium',
    conceptSlice,
    compendiumSlice,
    ConceptService,
  )
  return {
    ...manager,
    compendium: manager.parent,
    concept: manager.entity,
    notes: useNotableDataManager(conceptSlice, ConceptService.notes),
    quests: useQuestableDataManager(conceptSlice, ConceptService.quests),
    encounters: useEncounterableDataManager(conceptSlice, ConceptService.encounters),
    images: useImageableDataManager(conceptSlice, ConceptService.images)
  }
}

export default useConceptDataManager;