import { TImage, TImageType } from '../../types'
import { createAttachableService, TAttachableApi } from './createAttachableService'

export interface TImageAttachRequest {
  type_id?: TImageType['id'] | null,
  image_id: TImage['id'],
}

export type TImageAttachResponse = TImage

export type TImageableApi = { images: TAttachableApi<TImageAttachRequest, TImageAttachResponse> }

export const createImageableService = (parentPluralName: string): TImageableApi => ({
  images: createAttachableService<TImageAttachRequest, TImageAttachResponse>('image', parentPluralName, 'images')
})