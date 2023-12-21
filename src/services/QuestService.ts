import { AxiosResponse } from 'axios'
import { TQuest, TCompendium, TQueryParams } from '../types'
import api from '../api'

export interface TQuestRequest {
  name: string;
  content: string;
}
type TQuestResponse = {
  data: TQuest;
}
type TQuestIndexResponse = {
  data: TQuest[];
}

export const indexQuests = (compendiumId: TCompendium['slug'], query: TQueryParams = {}): Promise<AxiosResponse<TQuestIndexResponse>> => {

  return api.get(`/api/compendia/${compendiumId}/quests?${new URLSearchParams(query).toString()}`)

}

export const viewQuest = (slug: string, query: TQueryParams = {}): Promise<AxiosResponse<TQuestResponse>> => {

  return api.get(`/api/quests/${slug}?${new URLSearchParams(query).toString()}`)

}

export const storeQuest = (compendiumId: TCompendium['slug'], data: TQuestRequest): Promise<AxiosResponse<TQuestResponse>> => {

  return api.post(`/api/compendia/${compendiumId}/quests`, data)

}

export const updateQuest = (slug: string, data: Partial<TQuestRequest>): Promise<AxiosResponse<TQuestResponse>> => {
  return api.put(`/api/quests/${slug}`, data)
}

export const destroyQuest = (slug: string): Promise<AxiosResponse<void>> => {
  return api.delete(`/api/quests/${slug}`)
}