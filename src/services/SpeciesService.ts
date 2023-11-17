import { AxiosResponse } from 'axios'
import { TSpecies, TCompendium, TQueryParams } from '../types'
import api from '../api'

export interface TSpeciesRequest {
  name: string;
  content: string;
}
type TSpeciesResponse = {
  data: TSpecies;
}
type TSpeciesIndexResponse = {
  data: TSpecies[];
}

export const indexSpecies = (compendiumId: TCompendium['slug'], query: TQueryParams = {}): Promise<AxiosResponse<TSpeciesIndexResponse>> => {

  return api.get(`/api/compendia/${compendiumId}/species?${new URLSearchParams(query).toString()}`)

}

export const viewSpecies = (slug: string, query: TQueryParams = {}): Promise<AxiosResponse<TSpeciesResponse>> => {

  return api.get(`/api/species/${slug}?${new URLSearchParams(query).toString()}`)

}

export const storeSpecies = (compendiumId: TCompendium['slug'], data: TSpeciesRequest): Promise<AxiosResponse<TSpeciesResponse>> => {

  return api.post(`/api/compendia/${compendiumId}/species`, data)

}

export const updateSpecies = (slug: string, data: Partial<TSpeciesRequest>): Promise<AxiosResponse<TSpeciesResponse>> => {
  return api.put(`/api/species/${slug}`, data)
}

export const destroySpecies = (slug: string): Promise<AxiosResponse<void>> => {
  return api.put(`/api/species/${slug}`)
}