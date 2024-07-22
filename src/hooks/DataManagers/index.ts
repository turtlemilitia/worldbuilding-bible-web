import {
  createAttachableDataManager,
  hasEncountersAttachableDataManager,
  hasNotesAttachableDataManager,
  hasQuestsAttachableDataManager
} from './createAttachableDataManager'
import { createChildDataManager } from './createChildDataManager'
import { createDataManager } from './createDataManager'
import { createImageableDataManager, hasImageableDataManager } from './createImageableDataManager'
import useCampaignDataManager from './Campaigns/useCampaignDataManager'
import useCompendiumDataManager from './Compendia/useCompendiumDataManager'
import useNotebookDataManager from './Notebooks/useNotebookDataManager'
import useEncounterDataManager from './Campaigns/useEncounterDataManager'
import useSessionDataManager from './Campaigns/useSessionDataManager'
import useQuestDataManager from './Campaigns/useQuestDataManager'
import useCharacterDataManager from './Compendia/useCharacterDataManager'
import useConceptDataManager from './Compendia/useConceptDataManager'
import useCurrencyDataManager from './Compendia/useCurrencyDataManager'
import useDeityDataManager from './Compendia/useDeityDataManager'
import useFactionDataManager from './Compendia/useFactionDataManager'
import useItemDataManager from './Compendia/useItemDataManager'
import useLanguageDataManager from './Compendia/useLanguageDataManager'
import useLocationDataManager from './Compendia/useLocationDataManager'
import useNaturalResourceDataManager from './Compendia/useNaturalResourceDataManager'
import usePantheonDataManager from './Compendia/usePantheonDataManager'
import usePlaneDataManager from './Compendia/usePlaneDataManager'
import useReligionDataManager from './Compendia/useReligionDataManager'
import useSpeciesDataManager from './Compendia/useSpeciesDataManager'
import useSpellDataManager from './Compendia/useSpellDataManager'
import useStoryDataManager from './Compendia/useStoryDataManager'

export {
  createDataManager,
  createChildDataManager,
  createAttachableDataManager,
  createImageableDataManager,
  useCompendiumDataManager,
  useCharacterDataManager,
  useConceptDataManager,
  useCurrencyDataManager,
  useDeityDataManager,
  useFactionDataManager,
  useItemDataManager,
  useLanguageDataManager,
  useLocationDataManager,
  useNaturalResourceDataManager,
  usePantheonDataManager,
  usePlaneDataManager,
  useReligionDataManager,
  useSpeciesDataManager,
  useSpellDataManager,
  useStoryDataManager,
  useCampaignDataManager,
  useEncounterDataManager,
  useSessionDataManager,
  useQuestDataManager,
  useNotebookDataManager
}

export type {
  hasImageableDataManager,
  hasNotesAttachableDataManager,
  hasEncountersAttachableDataManager,
  hasQuestsAttachableDataManager
}