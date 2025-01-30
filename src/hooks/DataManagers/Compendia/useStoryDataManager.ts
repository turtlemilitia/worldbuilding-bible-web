import { useChildDataManager, TChildDataManager } from '../useChildDataManager'
import { TStory, TCompendium } from '../../../types'
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
import StoryService, { TStoryRequest } from '../../../services/ApiService/Compendia/StoryService'
import { storySlice } from '../../../reducers/compendium/story/storySlice'
import { compendiaIndexSlice } from '@/reducers/compendium/compendiaIndexSlice'

export type TStoryDataManager = TChildDataManager<TCompendium, TStory, TStoryRequest> & {
  compendium?: TCompendium,
  story?: TStory,
} & hasImageableDataManager & hasNotesAttachableDataManager & hasQuestsAttachableDataManager & hasEncountersAttachableDataManager

const useStoryDataManager = (compendiumId?: number, id?: number): TStoryDataManager => {
  const manager = useChildDataManager(
    'stories',
    'compendia',
    compendiumId,
    id,
    compendiaIndexSlice,
    StoryService,
  )
  return {
    ...manager,
    compendium: manager.parent,
    story: manager.entity,
    notes: useNotableDataManager(manager, StoryService.notes),
    quests: useQuestableDataManager(manager, StoryService.quests),
    encounters: useEncounterableDataManager(manager, StoryService.encounters),
    images: useImageableDataManager(manager, StoryService.images)
  }
}

export default useStoryDataManager;