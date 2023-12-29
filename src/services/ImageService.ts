import { AxiosResponse } from 'axios'
import { TImage } from '../types'
import api from '../api'

interface TImageUpdateRequest {
  name: TImage['name'],
  alt: TImage['alt'],
}

interface TImageResponse {
  data: TImage;
}

interface TImageIndexResponse {
  data: TImage[];
}

export const indexImages = (): Promise<AxiosResponse<TImageIndexResponse>> => {

  return api.get(`/api/images`)

}

export const viewImage = (id: number): Promise<AxiosResponse<TImageResponse>> => {

  return api.get(`/api/images/${id}`)

}

export const storeImage = (data: FormData): Promise<AxiosResponse<TImageResponse>> => {

  return api.post(`/api/images`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

}

export const updateImage = (id: number, data: TImageUpdateRequest): Promise<AxiosResponse<TImageResponse>> => {
  return api.put(`/api/images/${id}`, data)
}

export const destroyImage = (id: number): Promise<AxiosResponse<void>> => {
  return api.delete(`/api/images/${id}`)
}