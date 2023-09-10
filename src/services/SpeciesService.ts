import { AxiosResponse } from 'axios'
import { TSpecies, TCompendium } from '../types'
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

export const indexSpecies = (compendiumId: TCompendium['slug'], withArr: string[] = []): Promise<AxiosResponse<TSpeciesIndexResponse>> => {

  return api.get(`/api/compendia/${compendiumId}/species${withArr.length ? `?with=${withArr.join(',')}` : ''}`)

}

export const viewSpecies = (slug: string, withArr: string[] = []): Promise<AxiosResponse<TSpeciesResponse>> => {

  return api.get(`/api/species/${slug}${withArr.length ? `?with=${withArr.join(',')}` : ''}`)

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