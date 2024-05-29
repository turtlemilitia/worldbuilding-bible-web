import { AxiosResponse } from 'axios'
import { TFaction, TCompendium, TQueryParams } from '../types'
import api from '../api'

export interface TFactionRequest {
  name: string;
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

export const storeFaction = (compendiumId: TCompendium['slug'], data: TFactionRequest, query: TQueryParams = {}): Promise<AxiosResponse<TFactionResponse>> => {

  return api.post(`/api/compendia/${compendiumId}/factions?${new URLSearchParams(query).toString()}`, data)

}

export const updateFaction = (slug: string, data: Partial<TFactionRequest>, query: TQueryParams = {}): Promise<AxiosResponse<TFactionResponse>> => {
  return api.put(`/api/factions/${slug}?${new URLSearchParams(query).toString()}`, data)
}

export const destroyFaction = (slug: string): Promise<AxiosResponse<void>> => {
  return api.delete(`/api/factions/${slug}`)
}

export const attachFactionToCharacter = (slug: string, factionId: number): Promise<AxiosResponse<TFactionResponse>> => {
  return api.post(`/api/characters/${slug}/factions`, { factionId })
}

export const detachFactionFromCharacter = (slug: string, factionSlug: string): Promise<AxiosResponse<{}>> => {
  return api.delete(`/api/characters/${slug}/factions/${factionSlug}`)
}