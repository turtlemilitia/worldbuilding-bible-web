import { useChildDataManager, TChildDataManager } from '../useChildDataManager'
import { TConcept, TCompendium } from '@/types'
import {
  useEncounterableDataManager,
  useNotableDataManager,
  useQuestableDataManager,
  hasEncountersAttachableDataManager,
  hasNotesAttachableDataManager,
  hasQuestsAttachableDataManager
} from '../useAttachableDataManager'
import { useImageableDataManager, hasImageableDataManager } from '@/hooks/DataManagers'
import ConceptService, { TConceptRequest } from '../../../services/ApiService/Compendia/ConceptService'
import { compendiaIndexSlice } from '@/reducers/compendium/compendiaIndexSlice'

export type TConceptDataManager = TChildDataManager<TCompendium, TConcept, TConceptRequest> & {
  compendium?: TCompendium,
  concept?: TConcept,
} & hasImageableDataManager & hasNotesAttachableDataManager & hasQuestsAttachableDataManager & hasEncountersAttachableDataManager

const useConceptDataManager = (compendiumId?: number, id?: number): TConceptDataManager => {
  const manager = useChildDataManager(
    'concepts',
    'compendia',
    compendiumId,
    id,
    compendiaIndexSlice,
    ConceptService,
  )
  return {
    ...manager,
    compendium: manager.parent,
    concept: manager.entity,
    notes: useNotableDataManager(manager, ConceptService.notes),
    quests: useQuestableDataManager(manager, ConceptService.quests),
    encounters: useEncounterableDataManager(manager, ConceptService.encounters),
    images: useImageableDataManager(manager, ConceptService.images)
  }
}

export default useConceptDataManager;