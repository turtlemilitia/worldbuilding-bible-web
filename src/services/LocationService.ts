import { AxiosResponse } from 'axios'
import { TLocation, TLocationGovernmentType, TLocationType, TCompendium, TQueryParams } from '../types'
import api from '../api'

export interface TLocationRequest {
  parentId: TLocation['id'];
  name: string;
  typeId: TLocationType['id'];
  content: string;
  demonym?: string;
  aliases?: string;
  population?: number;
  governmentTypeId?: TLocationGovernmentType['id'];
}
type TLocationResponse = {
  data: TLocation;
}
type TLocationIndexResponse = {
  data: TLocation[];
}

export const indexLocations = (compendiumId: TCompendium['slug'], query: TQueryParams): Promise<AxiosResponse<TLocationIndexResponse>> => {

  return api.get(`/api/compendia/${compendiumId}/locations?${new URLSearchParams(query).toString()}`)

}

export const viewLocation = (slug: string, query: TQueryParams = {}): Promise<AxiosResponse<TLocationResponse>> => {

  return api.get(`/api/locations/${slug}?${new URLSearchParams(query).toString()}`)

}

export const storeLocation = (compendiumId: TCompendium['slug'], data: TLocationRequest, query: TQueryParams = {}): Promise<AxiosResponse<TLocationResponse>> => {

  return api.post(`/api/compendia/${compendiumId}/locations?${new URLSearchParams(query).toString()}`, data)

}

export const updateLocation = (slug: string, data: Partial<TLocationRequest>, query: TQueryParams = {}): Promise<AxiosResponse<TLocationResponse>> => {
  return api.put(`/api/locations/${slug}?${new URLSearchParams(query).toString()}`, data)
}

export const destroyLocation = (slug: string): Promise<AxiosResponse<void>> => {
  return api.put(`/api/locations/${slug}`)
}