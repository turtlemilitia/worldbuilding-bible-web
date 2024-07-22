import { AxiosResponse } from 'axios'
import { TImage } from '../../../types'
import api from '../../../api'
import { createApiService } from '../createApiService'

interface TImageUpdateRequest {
  name: TImage['name'],
  alt: TImage['alt'],
}

type TImageResponse = TImage;

type TImageIndexResponse = TImage[];

const ImageService = {
  ...createApiService<TImageUpdateRequest, TImageIndexResponse, TImageResponse>('images'),
  store: (data: FormData): Promise<AxiosResponse<{ data: TImageResponse }>> => {

    return api.post(`/api/images`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

  }
}

export default ImageService