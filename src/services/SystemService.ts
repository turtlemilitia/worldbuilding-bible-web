import { AxiosResponse } from 'axios'
import { TSystem } from '../types'
import api from '../api'

interface TSystemResponse {
  data: TSystem;
}
interface TSystemIndexResponse {
  data: TSystem[];
}

export const indexSystems = (): Promise<AxiosResponse<TSystemIndexResponse>> => {

  return api.get(`/api/systems`)

}

export const viewSystem = (slug: string): Promise<AxiosResponse<TSystemResponse>> => {

  return api.get(`/api/systems/${slug}`)

}

export const storeSystem = (data: TSystem): Promise<AxiosResponse<TSystemResponse>> => {

  return api.post(`/api/systems`, data)

}

export const updateSystem = (slug: string, data: Partial<TSystem>): Promise<AxiosResponse<TSystemResponse>> => {
  return api.put(`/api/systems/${slug}`, data)
}

export const destroySystem = (slug: string): Promise<AxiosResponse<void>> => {
  return api.delete(`/api/systems/${slug}`)
}