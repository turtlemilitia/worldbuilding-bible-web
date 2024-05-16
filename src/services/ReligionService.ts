import { AxiosResponse } from 'axios'
import { TReligion, TCompendium, TQueryParams } from '../types'
import api from '../api'

export interface TReligionRequest {
  name: string;
  content: string;
}
type TReligionResponse = {
  data: TReligion;
}
type TReligionIndexResponse = {
  data: TReligion[];
}

export const indexReligions = (compendiumId: TCompendium['slug'], query: TQueryParams = {}): Promise<AxiosResponse<TReligionIndexResponse>> => {

  return api.get(`/api/compendia/${compendiumId}/religions?${new URLSearchParams(query).toString()}`)

}

export const viewReligion = (slug: string, query: TQueryParams = {}): Promise<AxiosResponse<TReligionResponse>> => {

  return api.get(`/api/religions/${slug}?${new URLSearchParams(query).toString()}`)

}

export const storeReligion = (compendiumId: TCompendium['slug'], data: TReligionRequest, query: TQueryParams = {}): Promise<AxiosResponse<TReligionResponse>> => {

  return api.post(`/api/compendia/${compendiumId}/religions?${new URLSearchParams(query).toString()}`, data)

}

export const updateReligion = (slug: string, data: Partial<TReligionRequest>, query: TQueryParams = {}): Promise<AxiosResponse<TReligionResponse>> => {
  return api.put(`/api/religions/${slug}?${new URLSearchParams(query).toString()}`, data)
}

export const destroyReligion = (slug: string): Promise<AxiosResponse<void>> => {
  return api.delete(`/api/religions/${slug}`)
}