import { AxiosResponse } from 'axios'
import { TStory, TCompendium } from '../types'
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

export const indexStories = (compendiumId: TCompendium['slug'], withArr: string[] = []): Promise<AxiosResponse<TStoryIndexResponse>> => {

  return api.get(`/api/compendia/${compendiumId}/stories${withArr.length ? `?with=${withArr.join(',')}` : ''}`)

}

export const viewStory = (slug: string, withArr: string[] = []): Promise<AxiosResponse<TStoryResponse>> => {

  return api.get(`/api/stories/${slug}${withArr.length ? `?with=${withArr.join(',')}` : ''}`)

}

export const storeStory = (compendiumId: TCompendium['slug'], data: TStoryRequest): Promise<AxiosResponse<TStoryResponse>> => {

  return api.post(`/api/compendia/${compendiumId}/stories`, data)

}

export const updateStory = (slug: string, data: Partial<TStoryRequest>): Promise<AxiosResponse<TStoryResponse>> => {
  return api.put(`/api/stories/${slug}`, data)
}

export const destroyStory = (slug: string): Promise<AxiosResponse<void>> => {
  return api.put(`/api/stories/${slug}`)
}