import { AxiosResponse } from 'axios'
import { TFaction, TCompendium } from '../types'
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

export const indexFactions = (compendiumId: TCompendium['slug'], withArr: string[] = []): Promise<AxiosResponse<TFactionIndexResponse>> => {

  return api.get(`/api/compendia/${compendiumId}/factions${withArr.length ? `?with=${withArr.join(',')}` : ''}`)

}

export const viewFaction = (slug: string, withArr: string[] = []): Promise<AxiosResponse<TFactionResponse>> => {

  return api.get(`/api/factions/${slug}${withArr.length ? `?with=${withArr.join(',')}` : ''}`)

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