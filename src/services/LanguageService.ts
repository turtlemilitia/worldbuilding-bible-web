import { AxiosResponse } from 'axios'
import { TLanguage, TCompendium, TQueryParams } from '../types'
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

export const indexLanguages = (compendiumId: TCompendium['slug'], query: TQueryParams = {}): Promise<AxiosResponse<TLanguageIndexResponse>> => {

  return api.get(`/api/compendia/${compendiumId}/languages?${new URLSearchParams(query).toString()}`)

}

export const viewLanguage = (slug: string, query: TQueryParams = {}): Promise<AxiosResponse<TLanguageResponse>> => {

  return api.get(`/api/languages/${slug}?${new URLSearchParams(query).toString()}`)

}

export const storeLanguage = (compendiumId: TCompendium['slug'], data: TLanguageRequest, query: TQueryParams = {}): Promise<AxiosResponse<TLanguageResponse>> => {

  return api.post(`/api/compendia/${compendiumId}/languages?${new URLSearchParams(query).toString()}`, data)

}

export const updateLanguage = (slug: string, data: Partial<TLanguageRequest>, query: TQueryParams = {}): Promise<AxiosResponse<TLanguageResponse>> => {
  return api.put(`/api/languages/${slug}?${new URLSearchParams(query).toString()}`, data)
}

export const destroyLanguage = (slug: string): Promise<AxiosResponse<void>> => {
  return api.delete(`/api/languages/${slug}`)
}

export const attachLanguageToCharacter = (slug: string, languageId: number): Promise<AxiosResponse<TLanguageResponse>> => {
  return api.post(`/api/characters/${slug}/languages`, { languageId })
}

export const detachLanguageFromCharacter = (slug: string, languageSlug: string): Promise<AxiosResponse<{}>> => {
  return api.delete(`/api/characters/${slug}/languages/${languageSlug}`)
}