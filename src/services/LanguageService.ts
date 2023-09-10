import { AxiosResponse } from 'axios'
import { TLanguage, TCompendium } from '../types'
import api from '../api'

export interface TLanguageRequest {
  name: string;
  content: string;
}
type TLanguageResponse = {
  data: TLanguage;
}
type TLanguageIndexResponse = {
  data: TLanguage[];
}

export const indexLanguages = (compendiumId: TCompendium['slug'], withArr: string[] = []): Promise<AxiosResponse<TLanguageIndexResponse>> => {

  return api.get(`/api/compendia/${compendiumId}/languages${withArr.length ? `?with=${withArr.join(',')}` : ''}`)

}

export const viewLanguage = (slug: string, withArr: string[] = []): Promise<AxiosResponse<TLanguageResponse>> => {

  return api.get(`/api/languages/${slug}${withArr.length ? `?with=${withArr.join(',')}` : ''}`)

}

export const storeLanguage = (compendiumId: TCompendium['slug'], data: TLanguageRequest): Promise<AxiosResponse<TLanguageResponse>> => {

  return api.post(`/api/compendia/${compendiumId}/languages`, data)

}

export const updateLanguage = (slug: string, data: Partial<TLanguageRequest>): Promise<AxiosResponse<TLanguageResponse>> => {
  return api.put(`/api/languages/${slug}`, data)
}

export const destroyLanguage = (slug: string): Promise<AxiosResponse<void>> => {
  return api.put(`/api/languages/${slug}`)
}