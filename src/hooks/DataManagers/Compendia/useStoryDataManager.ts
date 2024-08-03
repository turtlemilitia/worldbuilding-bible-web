import { createChildDataManager, TChildDataManager } from '../createChildDataManager'
import { TStory, TCompendium } from '../../../types'
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
import StoryService, { TStoryRequest } from '../../../services/ApiService/Compendia/StoryService'
import { storySlice } from '../../../reducers/compendium/story/storySlice'

type TStoryDataManager = TChildDataManager<TCompendium, TStory, TStoryRequest> & {
  compendium?: TCompendium,
  story?: TStory,
} & hasImageableDataManager & hasNotesAttachableDataManager & hasQuestsAttachableDataManager & hasEncountersAttachableDataManager

const useStoryDataManager = (): TStoryDataManager => {
  const manager = useMemo(() => createChildDataManager(
    'story',
    'compendium',
    storySlice,
    compendiumSlice,
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