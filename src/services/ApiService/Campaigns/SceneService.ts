import { TScene } from '@/types'
import { createChildApiService } from '../createApiService'
import { createNotableService } from '../createNotableService'
import { createImageableService } from '../createImageableService'
import { createEncounterableService } from '../createEncounterableService'
import { createCharacterableService } from '../createCharacterableService'
import { createLocationableService } from '../createLocationableService'

export type TSceneRequest = {
  name: string;
  content: string;
  completedAt?: string|null;
}

export type TSceneResponse = TScene

export type TSceneIndexResponse = TScene[];

const SceneService = {
  ...createChildApiService<TSceneRequest, TSceneIndexResponse, TSceneResponse> ('campaigns', 'scenes'),
  ...createEncounterableService('scenes'),
  ...createNotableService('scenes'),
  ...createImageableService('scenes'),
  ...createCharacterableService('scenes'),
  ...createLocationableService('scenes')
}

export default SceneService