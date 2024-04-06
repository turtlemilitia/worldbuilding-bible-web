import { AxiosResponse } from 'axios'
import { TEncounter, TCampaign, TQueryParams } from '../types'
import api from '../api'

export interface TEncounterRequest {
  name: string;
  content: string;
  typeId: number
}
type TEncounterResponse = {
  data: TEncounter;
}
type TEncounterIndexResponse = {
  data: TEncounter[];
}

export const indexEncounters = (campaignId: TCampaign['slug'], query: TQueryParams = {}): Promise<AxiosResponse<TEncounterIndexResponse>> => {

  return api.get(`/api/campaigns/${campaignId}/encounters?${new URLSearchParams(query).toString()}`)

}

export const viewEncounter = (slug: string, query: TQueryParams = {}): Promise<AxiosResponse<TEncounterResponse>> => {

  return api.get(`/api/encounters/${slug}?${new URLSearchParams(query).toString()}`)

}

export const storeEncounter = (campaignId: TCampaign['slug'], data: TEncounterRequest): Promise<AxiosResponse<TEncounterResponse>> => {

  return api.post(`/api/campaigns/${campaignId}/encounters`, data)

}

export const updateEncounter = (slug: string, data: Partial<TEncounterRequest>): Promise<AxiosResponse<TEncounterResponse>> => {
  return api.put(`/api/encounters/${slug}`, data)
}

export const destroyEncounter = (slug: string): Promise<AxiosResponse<void>> => {
  return api.delete(`/api/encounters/${slug}`)
}