import { AxiosResponse } from 'axios'
import { TStory, TCompendium, TQueryParams } from '../types'
import api from '../api'

export interface TStoryRequest {
  name: string;
  content: string;
}
type TStoryResponse = {
  data: TStory;
}
type TStoryIndexResponse = {
  data: TStory[];
}

export const indexStories = (compendiumId: TCompendium['slug'], query: TQueryParams = {}): Promise<AxiosResponse<TStoryIndexResponse>> => {

  return api.get(`/api/compendia/${compendiumId}/stories?${new URLSearchParams(query).toString()}`)

}

export const viewStory = (slug: string, query: TQueryParams = {}): Promise<AxiosResponse<TStoryResponse>> => {

  return api.get(`/api/stories/${slug}?${new URLSearchParams(query).toString()}`)

}

export const storeStory = (compendiumId: TCompendium['slug'], data: TStoryRequest): Promise<AxiosResponse<TStoryResponse>> => {

  return api.post(`/api/compendia/${compendiumId}/stories`, data)

}

export const updateStory = (slug: string, data: Partial<TStoryRequest>): Promise<AxiosResponse<TStoryResponse>> => {
  return api.put(`/api/stories/${slug}`, data)
}

export const destroyStory = (slug: string): Promise<AxiosResponse<void>> => {
  return api.delete(`/api/stories/${slug}`)
}