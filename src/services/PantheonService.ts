import { AxiosResponse } from 'axios'
import { TPantheon, TCompendium } from '../types'
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

export const indexPantheons = (compendiumId: TCompendium['slug'], withArr: string[] = []): Promise<AxiosResponse<TPantheonIndexResponse>> => {

  return api.get(`/api/compendia/${compendiumId}/pantheons${withArr.length ? `?with=${withArr.join(',')}` : ''}`)

}

export const viewPantheon = (slug: string, withArr: string[] = []): Promise<AxiosResponse<TPantheonResponse>> => {

  return api.get(`/api/pantheons/${slug}${withArr.length ? `?with=${withArr.join(',')}` : ''}`)

}

export const storePantheon = (compendiumId: TCompendium['slug'], data: TPantheonRequest): Promise<AxiosResponse<TPantheonResponse>> => {

  return api.post(`/api/compendia/${compendiumId}/pantheons`, data)

}

export const updatePantheon = (slug: string, data: Partial<TPantheonRequest>): Promise<AxiosResponse<TPantheonResponse>> => {
  return api.put(`/api/pantheons/${slug}`, data)
}

export const destroyPantheon = (slug: string): Promise<AxiosResponse<void>> => {
  return api.put(`/api/pantheons/${slug}`)
}