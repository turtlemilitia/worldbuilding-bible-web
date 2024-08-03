import { createChildDataManager, TChildDataManager } from '../createChildDataManager'
import { TSpecies, TCompendium } from '../../../types'
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
import SpeciesService, { TSpeciesRequest } from '../../../services/ApiService/Compendia/SpeciesService'
import { speciesSlice } from '../../../reducers/compendium/species/speciesSlice'

type TSpeciesDataManager = TChildDataManager<TCompendium, TSpecies, TSpeciesRequest> & {
  compendium?: TCompendium,
  species?: TSpecies,
} & hasImageableDataManager & hasNotesAttachableDataManager & hasQuestsAttachableDataManager & hasEncountersAttachableDataManager

const useSpeciesDataManager = (): TSpeciesDataManager => {
  const manager = useMemo(() => createChildDataManager(
    'species',
    'compendium',
    speciesSlice,
    compendiumSlice,
    SpeciesService,
  ), [])
  return {
    ...manager,
    compendium: manager.parent,
    species: manager.entity,
    notes: useMemo(() => createNotableDataManager(speciesSlice, SpeciesService.notes), []),
    quests: useMemo(() => createQuestableDataManager(speciesSlice, SpeciesService.quests), []),
    encounters: useMemo(() => createEncounterableDataManager(speciesSlice, SpeciesService.encounters), []),
    images: useMemo(() => createImageableDataManager(speciesSlice, SpeciesService.images), [])
  }
}

export default useSpeciesDataManager;