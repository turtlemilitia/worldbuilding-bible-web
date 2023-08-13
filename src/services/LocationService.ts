import { AxiosResponse } from 'axios'
import { TLocation, TLocationGovernmentType, TLocationType, TCompendium } from '../types'
import api from '../api'

export interface TLocationRequest {
  parentId: TLocation['id'];
  name: string;
  typeId: TLocationType['id'];
  content: string;
  demonym?: string;
  population?: number;
  governmentTypeId?: TLocationGovernmentType['id'];
}
type TLocationResponse = {
  data: TLocation;
}
type TLocationIndexResponse = {
  data: TLocation[];
}

export const indexLocations = (compendiumId: TCompendium['slug']): Promise<AxiosResponse<TLocationIndexResponse>> => {

  return api.get(`/api/compendia/${compendiumId}/locations`)

}

export const viewLocation = (slug: string): Promise<AxiosResponse<TLocationResponse>> => {

  return api.get(`/api/locations/${slug}`)

}

export const storeLocation = (compendiumId: TCompendium['slug'], data: TLocationRequest): Promise<AxiosResponse<TLocationResponse>> => {

  return api.post(`/api/compendia/${compendiumId}/locations`, data)

}

export const updateLocation = (slug: string, data: Partial<TLocationRequest>): Promise<AxiosResponse<TLocationResponse>> => {
  return api.put(`/api/locations/${slug}`, data)
}

export const destroyLocation = (slug: string): Promise<AxiosResponse<void>> => {
  return api.put(`/api/locations/${slug}`)
}