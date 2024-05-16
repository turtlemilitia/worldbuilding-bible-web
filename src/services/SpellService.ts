import { AxiosResponse } from 'axios'
import { TSpell, TCompendium, TQueryParams } from '../types'
import api from '../api'

export interface TSpellRequest {
  name: string;
  content: string;
}
type TSpellResponse = {
  data: TSpell;
}
type TSpellIndexResponse = {
  data: TSpell[];
}

export const indexSpells = (compendiumId: TCompendium['slug'], query: TQueryParams = {}): Promise<AxiosResponse<TSpellIndexResponse>> => {

  return api.get(`/api/compendia/${compendiumId}/spells?${new URLSearchParams(query).toString()}`)

}

export const viewSpell = (slug: string, query: TQueryParams = {}): Promise<AxiosResponse<TSpellResponse>> => {

  return api.get(`/api/spells/${slug}?${new URLSearchParams(query).toString()}`)

}

export const storeSpell = (compendiumId: TCompendium['slug'], data: TSpellRequest, query: TQueryParams = {}): Promise<AxiosResponse<TSpellResponse>> => {

  return api.post(`/api/compendia/${compendiumId}/spells?${new URLSearchParams(query).toString()}`, data)

}

export const updateSpell = (slug: string, data: Partial<TSpellRequest>, query: TQueryParams = {}): Promise<AxiosResponse<TSpellResponse>> => {
  return api.put(`/api/spells/${slug}?${new URLSearchParams(query).toString()}`, data)
}

export const destroySpell = (slug: string): Promise<AxiosResponse<void>> => {
  return api.delete(`/api/spells/${slug}`)
}