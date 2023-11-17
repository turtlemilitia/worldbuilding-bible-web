import { AxiosResponse } from 'axios'
import { TFaction, TCompendium, TQueryParams } from '../types'
import api from '../api'

export interface TFactionRequest {
  name: string;
  age: string;
  gender: string;
  content: string;
}
type TFactionResponse = {
  data: TFaction;
}
type TFactionIndexResponse = {
  data: TFaction[];
}

export const indexFactions = (compendiumId: TCompendium['slug'], query: TQueryParams = {}): Promise<AxiosResponse<TFactionIndexResponse>> => {

  return api.get(`/api/compendia/${compendiumId}/factions?${new URLSearchParams(query).toString()}`)

}

export const viewFaction = (slug: string, query: TQueryParams = {}): Promise<AxiosResponse<TFactionResponse>> => {

  return api.get(`/api/factions/${slug}?${new URLSearchParams(query).toString()}`)

}

export const storeFaction = (compendiumId: TCompendium['slug'], data: TFactionRequest): Promise<AxiosResponse<TFactionResponse>> => {

  return api.post(`/api/compendia/${compendiumId}/factions`, data)

}

export const updateFaction = (slug: string, data: Partial<TFactionRequest>): Promise<AxiosResponse<TFactionResponse>> => {
  return api.put(`/api/factions/${slug}`, data)
}

export const destroyFaction = (slug: string): Promise<AxiosResponse<void>> => {
  return api.put(`/api/factions/${slug}`)
}