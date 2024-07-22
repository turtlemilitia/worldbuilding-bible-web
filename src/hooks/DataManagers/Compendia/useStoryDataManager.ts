import { createChildDataManager, TUseChildDataManager } from '../createChildDataManager'
import { TCampaign, TStory, TCompendium } from '../../../types'
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
import StoryService, { TStoryRequest } from '../../../services/ApiService/Compendia/StoryService'
import { storySlice } from '../../../reducers/compendium/story/storySlice'

type TUseStoryDataManager = TUseChildDataManager<TCampaign, TStory, TStoryRequest> & {
  compendium?: TCompendium,
  story?: TStory,
} & hasImageableDataManager & hasNotesAttachableDataManager & hasQuestsAttachableDataManager & hasEncountersAttachableDataManager

const useStoryDataManager = (): TUseStoryDataManager => {
  const manager = useMemo(() => createChildDataManager(
    'story',
    'campaign',
    storySlice,
    campaignSlice,
    StoryService,
  ), [])
  return {
    ...manager,
    compendium: manager.parent,
    story: manager.entity,
    notes: useMemo(() => createNotableDataManager(storySlice, StoryService.notes), []),
    quests: useMemo(() => createQuestableDataManager(storySlice, StoryService.quests), []),
    encounters: useMemo(() => createEncounterableDataManager(storySlice, StoryService.encounters), []),
    images: useMemo(() => createImageableDataManager(storySlice, StoryService.images), [])
  }
}

export default useStoryDataManager;