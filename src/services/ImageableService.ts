import { TImage, TImageType } from '../types'
import api from '../api'
import { AxiosResponse } from 'axios'

interface TImageableStoreRequest {
  type_id?: TImageType['id'] | null,
  image_id: TImage['id'],
}

interface TImageAttachResponse {
  data: TImage
}

export const attachImageToEntity = (imageableType: string, imageableId: string, data: TImageableStoreRequest): Promise<AxiosResponse<TImageAttachResponse>> => {
  return api.post(`/api/${imageableType}/${imageableId}/images?include=image`, data)
}