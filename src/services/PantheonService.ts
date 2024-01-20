import { AxiosResponse } from 'axios'
import { TPantheon, TCompendium, TQueryParams } from '../types'
import api from '../api'

export interface TPantheonRequest {
  name: string;
  content: string;
}
type TPantheonResponse = {
  data: TPantheon;
}
type TPantheonIndexResponse = {
  data: TPantheon[];
}

export const indexPantheons = (compendiumId: TCompendium['slug'], query: TQueryParams = {}): Promise<AxiosResponse<TPantheonIndexResponse>> => {

  return api.get(`/api/compendia/${compendiumId}/pantheons?${new URLSearchParams(query).toString()}`)

}

export const viewPantheon = (slug: string, query: TQueryParams = {}): Promise<AxiosResponse<TPantheonResponse>> => {

  return api.get(`/api/pantheons/${slug}?${new URLSearchParams(query).toString()}`)

}

export const storePantheon = (compendiumId: TCompendium['slug'], data: TPantheonRequest): Promise<AxiosResponse<TPantheonResponse>> => {

  return api.post(`/api/compendia/${compendiumId}/pantheons`, data)

}

export const updatePantheon = (slug: string, data: Partial<TPantheonRequest>): Promise<AxiosResponse<TPantheonResponse>> => {
  return api.put(`/api/pantheons/${slug}`, data)
}

export const destroyPantheon = (slug: string): Promise<AxiosResponse<void>> => {
  return api.delete(`/api/pantheons/${slug}`)
}