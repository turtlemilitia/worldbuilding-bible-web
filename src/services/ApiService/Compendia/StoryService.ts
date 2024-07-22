import { TStory } from '../../../types'
import { createChildApiService } from '../createApiService'
import { createImageableService } from '../createImageableService'
import { createNotableService } from '../createNotableService'
import { createQuestableService } from '../createQuestableService'
import { createEncounterableService } from '../createEncounterableService'

export interface TStoryRequest {
  name: string;
  content: string;
}

type TStoryResponse = TStory;

type TStoryIndexResponse = TStory[];

const pluralName = 'stories'

const StoryService = {
  ...createChildApiService<TStoryRequest, TStoryIndexResponse, TStoryResponse>('compendia', pluralName),
  ...createNotableService(pluralName),
  ...createImageableService(pluralName),
  ...createQuestableService(pluralName),
  ...createEncounterableService(pluralName)
}

export default StoryService