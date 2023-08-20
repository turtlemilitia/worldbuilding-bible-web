import { AxiosResponse } from 'axios'
import { TCharacter, TCompendium } from '../types'
import api from '../api'

export interface TCharacterRequest {
  name: string;
  age: string;
  gender: string;
  content: string;
}
type TCharacterResponse = {
  data: TCharacter;
}
type TCharacterIndexResponse = {
  data: TCharacter[];
}

export const indexCharacters = (compendiumId: TCompendium['slug'], withArr: string[] = []): Promise<AxiosResponse<TCharacterIndexResponse>> => {

  return api.get(`/api/compendia/${compendiumId}/characters${withArr.length ? `?with=${withArr.join(',')}` : ''}`)

}

export const viewCharacter = (slug: string, withArr: string[] = []): Promise<AxiosResponse<TCharacterResponse>> => {

  return api.get(`/api/characters/${slug}${withArr.length ? `?with=${withArr.join(',')}` : ''}`)

}

export const storeCharacter = (compendiumId: TCompendium['slug'], data: TCharacterRequest): Promise<AxiosResponse<TCharacterResponse>> => {

  return api.post(`/api/compendia/${compendiumId}/characters`, data)

}

export const updateCharacter = (slug: string, data: Partial<TCharacterRequest>): Promise<AxiosResponse<TCharacterResponse>> => {
  return api.put(`/api/characters/${slug}`, data)
}

export const destroyCharacter = (slug: string): Promise<AxiosResponse<void>> => {
  return api.put(`/api/characters/${slug}`)
}