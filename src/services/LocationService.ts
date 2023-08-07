import { AxiosResponse } from 'axios'
import { TLocation, TLocationGovernmentType, TLocationSize, TLocationType, TSetting } from '../types'
import api from '../api'

export interface TLocationRequest {
  setting: TSetting['id'];
  parent: TLocation['id'];
  name: string;
  type: TLocationType['id'];
  size: TLocationSize['id'];
  content: string;
  demonym?: string;
  population?: number;
  governmentType?: TLocationGovernmentType['id'];
  hasSubLocations?: boolean;
}
interface TLocationResponse {
  data: TLocation;
}
interface TLocationIndexResponse {
  data: TLocation[];
}

export const indexLocations = (): Promise<AxiosResponse<TLocationIndexResponse>> => {

  return api.get(`/api/locations`)

}

export const viewLocation = (slug: string): Promise<AxiosResponse<TLocationResponse>> => {

  return api.get(`/api/locations/${slug}`)

}

export const storeLocation = (data: TLocationRequest): Promise<AxiosResponse<TLocationResponse>> => {

  return api.post(`/api/locations`, data)

}

export const updateLocation = (slug: string, data: Partial<TLocationRequest>): Promise<AxiosResponse<TLocationResponse>> => {
  return api.put(`/api/locations/${slug}`, data)
}

export const destroyLocation = (slug: string): Promise<AxiosResponse<void>> => {
  return api.put(`/api/locations/${slug}`)
}