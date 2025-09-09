import {
  useAttachableDataManager,
  hasEncountersAttachableDataManager,
  hasNotesAttachableDataManager,
  hasQuestsAttachableDataManager
} from './useAttachableDataManager'
import { useChildDataManager } from './useChildDataManager'
import { useDataManager, TDataManager } from './useDataManager'
import { useImageableDataManager, hasImageableDataManager } from './useImageableDataManager'
import useCampaignDataManager, {TCampaignDataManager} from './Campaigns/useCampaignDataManager'
import useCompendiumDataManager, {TCompendiumDataManager} from './Compendia/useCompendiumDataManager'
import useEncounterDataManager, {TEncounterDataManager} from './Campaigns/useEncounterDataManager'
import useSceneDataManager, {TSceneDataManager} from './Campaigns/useSceneDataManager'
import useSessionDataManager, {TSessionDataManager} from './Campaigns/useSessionDataManager'
import useQuestDataManager, {TQuestDataManager} from './Campaigns/useQuestDataManager'
import useCharacterDataManager, {TCharacterDataManager} from './Compendia/useCharacterDataManager'
import useConceptDataManager, {TConceptDataManager} from './Compendia/useConceptDataManager'
import useCurrencyDataManager, {TCurrencyDataManager} from './Compendia/useCurrencyDataManager'
import useDeityDataManager, {TDeityDataManager} from './Compendia/useDeityDataManager'
import useFactionDataManager, {TFactionDataManager} from './Compendia/useFactionDataManager'
import useItemDataManager, {TItemDataManager} from './Compendia/useItemDataManager'
import useLanguageDataManager, {TLanguageDataManager} from './Compendia/useLanguageDataManager'
import useLocationDataManager, {TLocationDataManager} from './Compendia/useLocationDataManager'
import useNaturalResourceDataManager, {TNaturalResourceDataManager} from './Compendia/useNaturalResourceDataManager'
import usePantheonDataManager, {TPantheonDataManager} from './Compendia/usePantheonDataManager'
import usePlaneDataManager, {TPlaneDataManager} from './Compendia/usePlaneDataManager'
import useReligionDataManager, {TReligionDataManager} from './Compendia/useReligionDataManager'
import useSpeciesDataManager, {TSpeciesDataManager} from './Compendia/useSpeciesDataManager'
import useSpellDataManager, {TSpellDataManager} from './Compendia/useSpellDataManager'
import useStoryDataManager, {TStoryDataManager} from './Compendia/useStoryDataManager'
import useCampaignIndexDataManager, {TCampaignIndexDataManager} from './Campaigns/useCampaignIndexDataManager'
import useCompendiumIndexDataManager, {TCompendiumIndexDataManager} from './Compendia/useCompendiumIndexDataManager'
import useImageTypeIndexDataManager, {TImageTypeIndexDataManager} from './Images/useImageTypeIndexDataManager'
import useSystemIndexDataManager, {TSystemIndexDataManager} from './Systems/useSystemIndexDataManager'
import useGovernmentTypeIndexDataManager, {TGovernmentTypeIndexDataManager} from './Compendia/useGovernmentTypeIndexDataManager'
import useLocationTypeIndexDataManager, {TLocationTypeIndexDataManager} from './Compendia/useLocationTypeIndexDataManager'
import useQuestTypeIndexDataManager, {TQuestTypeIndexDataManager} from './Campaigns/useQuestTypeIndexDataManager'
import useEncounterTypeIndexDataManager, {TEncounterTypeIndexDataManager} from './Campaigns/useEncounterTypeIndexDataManager'
import useNoteIndexDataManager, {TNoteIndexDataManager} from '@/hooks/DataManagers/Notes/useNoteIndexDataManager'
import useNoteDataManager, {TNoteDataManager} from './Notes/useNoteDataManager'
import useSystemDataManager, { TSystemDataManager } from './Systems/useSystemDataManager'
import useMarkdownManager, { TMarkdownManager, hasMarkdownManager } from './useMarkdownManager'

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
  useSceneDataManager,
  useSessionDataManager,
  useQuestDataManager,
  useCampaignIndexDataManager,
  useCompendiumIndexDataManager,
  useImageTypeIndexDataManager,
  useSystemIndexDataManager,
  useGovernmentTypeIndexDataManager,
  useLocationTypeIndexDataManager,
  useQuestTypeIndexDataManager,
  useEncounterTypeIndexDataManager,
  useNoteIndexDataManager,
  useNoteDataManager,
  useSystemDataManager,
  useMarkdownManager,
}

export type {
  TDataManager,
  hasImageableDataManager,
  hasNotesAttachableDataManager,
  hasEncountersAttachableDataManager,
  hasQuestsAttachableDataManager,
  hasMarkdownManager,
  TCampaignDataManager,
  TCompendiumDataManager,
  TEncounterDataManager,
  TSceneDataManager,
  TSessionDataManager,
  TQuestDataManager,
  TCharacterDataManager,
  TConceptDataManager,
  TCurrencyDataManager,
  TDeityDataManager,
  TFactionDataManager,
  TItemDataManager,
  TLanguageDataManager,
  TLocationDataManager,
  TNaturalResourceDataManager,
  TPantheonDataManager,
  TPlaneDataManager,
  TReligionDataManager,
  TSpeciesDataManager,
  TSpellDataManager,
  TStoryDataManager,
  TCampaignIndexDataManager,
  TCompendiumIndexDataManager,
  TImageTypeIndexDataManager,
  TSystemIndexDataManager,
  TGovernmentTypeIndexDataManager,
  TLocationTypeIndexDataManager,
  TQuestTypeIndexDataManager,
  TEncounterTypeIndexDataManager,
  TNoteIndexDataManager,
  TNoteDataManager,
  TSystemDataManager,
  TMarkdownManager,
}