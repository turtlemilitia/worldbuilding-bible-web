import { TScene } from '../../../types'
import { createChildApiService } from '../createApiService'
import { createNotableService } from '../createNotableService'
import { createImageableService } from '../createImageableService'
import { createEncounterableService } from '../createEncounterableService'

export type TSceneRequest = {
  name: string;
  content: string;
}

export type TSceneResponse = TScene

export type TSceneIndexResponse = TScene[];

const SceneService = {
  ...createChildApiService<TSceneRequest, TSceneIndexResponse, TSceneResponse> ('campaigns', 'scenes'),
  ...createEncounterableService('scenes'),
  ...createNotableService('scenes'),
  ...createImageableService('scenes')
}

export default SceneService