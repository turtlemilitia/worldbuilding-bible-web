import {
  useAttachableDataManager,
  hasEncountersAttachableDataManager,
  hasNotesAttachableDataManager,
  hasQuestsAttachableDataManager
} from './useAttachableDataManager'
import { useChildDataManager } from './useChildDataManager'
import { useDataManager, TDataManager } from './useDataManager'
import { useImageableDataManager, hasImageableDataManager } from './useImageableDataManager'
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
import useCampaignIndexDataManager from './Campaigns/useCampaignIndexDataManager'
import useCompendiumIndexDataManager from './Compendia/useCompendiumIndexDataManager'
import useImageTypeIndexDataManager from './Images/useImageTypeIndexDataManager'
import useNotebookIndexDataManager from './Notebooks/useNotebookIndexDataManager'
import useSystemIndexDataManager from './Systems/useSystemIndexDataManager'
import useGovernmentTypeIndexDataManager from './Compendia/useGovernmentTypeIndexDataManager'
import useLocationTypeIndexDataManager from './Compendia/useLocationTypeIndexDataManager'
import useQuestTypeIndexDataManager from './Campaigns/useQuestTypeIndexDataManager'
import useEncounterTypeIndexDataManager from './Campaigns/useEncounterTypeIndexDataManager'

export {
  useDataManager,
  useChildDataManager,
  useAttachableDataManager,
  useImageableDataManager,
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
  useNotebookDataManager,
  useCampaignIndexDataManager,
  useCompendiumIndexDataManager,
  useImageTypeIndexDataManager,
  useNotebookIndexDataManager,
  useSystemIndexDataManager,
  useGovernmentTypeIndexDataManager,
  useLocationTypeIndexDataManager,
  useQuestTypeIndexDataManager,
  useEncounterTypeIndexDataManager,
}

export type {
  TDataManager,
  hasImageableDataManager,
  hasNotesAttachableDataManager,
  hasEncountersAttachableDataManager,
  hasQuestsAttachableDataManager
}