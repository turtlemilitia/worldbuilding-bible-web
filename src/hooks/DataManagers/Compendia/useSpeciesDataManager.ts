import { createChildDataManager, TUseChildDataManager } from '../createChildDataManager'
import { TCampaign, TSpecies, TCompendium } from '../../../types'
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
import SpeciesService, { TSpeciesRequest } from '../../../services/ApiService/Compendia/SpeciesService'
import { speciesSlice } from '../../../reducers/compendium/species/speciesSlice'

type TUseSpeciesDataManager = TUseChildDataManager<TCampaign, TSpecies, TSpeciesRequest> & {
  compendium?: TCompendium,
  species?: TSpecies,
} & hasImageableDataManager & hasNotesAttachableDataManager & hasQuestsAttachableDataManager & hasEncountersAttachableDataManager

const useSpeciesDataManager = (): TUseSpeciesDataManager => {
  const manager = useMemo(() => createChildDataManager(
    'species',
    'campaign',
    speciesSlice,
    campaignSlice,
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