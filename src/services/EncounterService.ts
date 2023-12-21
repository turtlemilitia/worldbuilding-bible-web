import { AxiosResponse } from 'axios'
import { TEncounter, TCompendium, TQueryParams } from '../types'
import api from '../api'

export interface TEncounterRequest {
  name: string;
  content: string;
}
type TEncounterResponse = {
  data: TEncounter;
}
type TEncounterIndexResponse = {
  data: TEncounter[];
}

export const indexEncounters = (compendiumId: TCompendium['slug'], query: TQueryParams = {}): Promise<AxiosResponse<TEncounterIndexResponse>> => {

  return api.get(`/api/compendia/${compendiumId}/encounters?${new URLSearchParams(query).toString()}`)

}

export const viewEncounter = (slug: string, query: TQueryParams = {}): Promise<AxiosResponse<TEncounterResponse>> => {

  return api.get(`/api/encounters/${slug}?${new URLSearchParams(query).toString()}`)

}

export const storeEncounter = (compendiumId: TCompendium['slug'], data: TEncounterRequest): Promise<AxiosResponse<TEncounterResponse>> => {

  return api.post(`/api/compendia/${compendiumId}/encounters`, data)

}

export const updateEncounter = (slug: string, data: Partial<TEncounterRequest>): Promise<AxiosResponse<TEncounterResponse>> => {
  return api.put(`/api/encounters/${slug}`, data)
}

export const destroyEncounter = (slug: string): Promise<AxiosResponse<void>> => {
  return api.put(`/api/encounters/${slug}`)
}