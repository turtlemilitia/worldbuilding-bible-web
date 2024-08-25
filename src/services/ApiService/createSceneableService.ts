import { TScene } from '../../types'
import { createAttachableService, TAttachableApi } from './createAttachableService'

export interface TSceneAttachRequest {
  sceneId: number | string,
}

export type TSceneAttachResponse = TScene

export type TSceneableApi = { scenes: TAttachableApi<TSceneAttachRequest, TSceneAttachResponse> }

export const createSceneableService = (parentPluralName: string): TSceneableApi => ({
  scenes: createAttachableService<TSceneAttachRequest, TSceneAttachResponse>('scene', parentPluralName, 'scenes')
})