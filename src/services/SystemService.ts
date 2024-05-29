import { AxiosResponse } from 'axios'
import { TQueryParams, TSystem } from '../types'
import api from '../api'

export type TSystemRequest  = {
  name: string;
  content: string;
}
interface TSystemResponse {
  data: TSystem;
}
interface TSystemIndexResponse {
  data: TSystem[];
}

export const indexSystems = (): Promise<AxiosResponse<TSystemIndexResponse>> => {

  return api.get(`/api/systems`)

}

export const viewSystem = (slug: string, query: TQueryParams = {}): Promise<AxiosResponse<TSystemResponse>> => {

  return api.get(`/api/systems/${slug}?${new URLSearchParams(query).toString()}`)

}

export const storeSystem = (data: TSystemRequest, query: TQueryParams = {}): Promise<AxiosResponse<TSystemResponse>> => {

  return api.post(`/api/systems?${new URLSearchParams(query).toString()}`, data)

}

export const updateSystem = (slug: string, data: Partial<TSystemRequest>, query: TQueryParams = {}): Promise<AxiosResponse<TSystemResponse>> => {
  return api.put(`/api/systems/${slug}?${new URLSearchParams(query).toString()}`, data)
}

export const destroySystem = (slug: string): Promise<AxiosResponse<void>> => {
  return api.delete(`/api/systems/${slug}`)
}