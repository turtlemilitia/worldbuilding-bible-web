import { useChildDataManager, TChildDataManager } from '../useChildDataManager'
import { TSpecies, TCompendium } from '../../../types'
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
import SpeciesService, { TSpeciesRequest } from '../../../services/ApiService/Compendia/SpeciesService'
import { compendiaIndexSlice } from '@/reducers/compendium/compendiaIndexSlice'

export type TSpeciesDataManager = TChildDataManager<TCompendium, TSpecies, TSpeciesRequest> & {
  compendium?: TCompendium,
  species?: TSpecies,
} & hasImageableDataManager & hasNotesAttachableDataManager & hasQuestsAttachableDataManager & hasEncountersAttachableDataManager

const useSpeciesDataManager = (compendiumId?: number, id?: number): TSpeciesDataManager => {
  const manager = useChildDataManager(
    'species',
    'compendia',
    compendiumId,
    id,
    compendiaIndexSlice,
    SpeciesService,
  )
  return {
    ...manager,
    compendium: manager.parent,
    species: manager.entity,
    notes: useNotableDataManager(manager, SpeciesService.notes),
    quests: useQuestableDataManager(manager, SpeciesService.quests),
    encounters: useEncounterableDataManager(manager, SpeciesService.encounters),
    images: useImageableDataManager(manager, SpeciesService.images)
  }
}

export default useSpeciesDataManager;