import { AxiosResponse } from 'axios'
import { TQuest, TCampaign, TQueryParams } from '../types'
import api from '../api'

export interface TQuestRequest {
  name: string;
  typeId: number;
  content: string;
  parentId?: number;
}
type TQuestResponse = {
  data: TQuest;
}
type TQuestIndexResponse = {
  data: TQuest[];
}

export const indexQuests = (campaignId: TCampaign['slug'], query: TQueryParams = {}): Promise<AxiosResponse<TQuestIndexResponse>> => {

  return api.get(`/api/campaigns/${campaignId}/quests?${new URLSearchParams(query).toString()}`)

}

export const viewQuest = (slug: string, query: TQueryParams = {}): Promise<AxiosResponse<TQuestResponse>> => {

  return api.get(`/api/quests/${slug}?${new URLSearchParams(query).toString()}`)

}

export const storeQuest = (campaignId: TCampaign['slug'], data: TQuestRequest, query: TQueryParams = {}): Promise<AxiosResponse<TQuestResponse>> => {

  return api.post(`/api/campaigns/${campaignId}/quests?${new URLSearchParams(query).toString()}`, data)

}

export const updateQuest = (slug: string, data: Partial<TQuestRequest>, query: TQueryParams = {}): Promise<AxiosResponse<TQuestResponse>> => {
  return api.put(`/api/quests/${slug}?${new URLSearchParams(query).toString()}`, data)
}

export const destroyQuest = (slug: string): Promise<AxiosResponse<void>> => {
  return api.delete(`/api/quests/${slug}`)
}