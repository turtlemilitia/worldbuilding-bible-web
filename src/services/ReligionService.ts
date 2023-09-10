import { AxiosResponse } from 'axios'
import { TReligion, TCompendium } from '../types'
import api from '../api'

export interface TReligionRequest {
  name: string;
  content: string;
}
type TReligionResponse = {
  data: TReligion;
}
type TReligionIndexResponse = {
  data: TReligion[];
}

export const indexReligions = (compendiumId: TCompendium['slug'], withArr: string[] = []): Promise<AxiosResponse<TReligionIndexResponse>> => {

  return api.get(`/api/compendia/${compendiumId}/religions${withArr.length ? `?with=${withArr.join(',')}` : ''}`)

}

export const viewReligion = (slug: string, withArr: string[] = []): Promise<AxiosResponse<TReligionResponse>> => {

  return api.get(`/api/religions/${slug}${withArr.length ? `?with=${withArr.join(',')}` : ''}`)

}

export const storeReligion = (compendiumId: TCompendium['slug'], data: TReligionRequest): Promise<AxiosResponse<TReligionResponse>> => {

  return api.post(`/api/compendia/${compendiumId}/religions`, data)

}

export const updateReligion = (slug: string, data: Partial<TReligionRequest>): Promise<AxiosResponse<TReligionResponse>> => {
  return api.put(`/api/religions/${slug}`, data)
}

export const destroyReligion = (slug: string): Promise<AxiosResponse<void>> => {
  return api.put(`/api/religions/${slug}`)
}