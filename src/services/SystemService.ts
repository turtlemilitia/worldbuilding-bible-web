import { AxiosResponse } from 'axios'
import { TSystem } from '../types'
import api from '../api'

export const indexSystems = (): Promise<AxiosResponse> => {

  return api.get(`/api/systems`)

}

export const viewSystem = (slug: string): Promise<AxiosResponse<TSystem>> => {

  return api.get(`/api/systems/${slug}`)

}

export const storeSystem = (data: TSystem): Promise<AxiosResponse<TSystem>> => {

  return api.post(`/api/systems`, data)

}

export const updateSystem = (slug: string, data: Partial<TSystem>) => {
  return api.put(`/api/systems/${slug}`, data)
}

export const destroySystem = (slug: string) => {
  return api.put(`/api/systems/${slug}`)
}