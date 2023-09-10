import { AxiosResponse } from 'axios'
import { TItem, TCompendium } from '../types'
import api from '../api'

export interface TItemRequest {
  name: string;
  age: string;
  gender: string;
  content: string;
}
type TItemResponse = {
  data: TItem;
}
type TItemIndexResponse = {
  data: TItem[];
}

export const indexItems = (compendiumId: TCompendium['slug'], withArr: string[] = []): Promise<AxiosResponse<TItemIndexResponse>> => {

  return api.get(`/api/compendia/${compendiumId}/items${withArr.length ? `?with=${withArr.join(',')}` : ''}`)

}

export const viewItem = (slug: string, withArr: string[] = []): Promise<AxiosResponse<TItemResponse>> => {

  return api.get(`/api/items/${slug}${withArr.length ? `?with=${withArr.join(',')}` : ''}`)

}

export const storeItem = (compendiumId: TCompendium['slug'], data: TItemRequest): Promise<AxiosResponse<TItemResponse>> => {

  return api.post(`/api/compendia/${compendiumId}/items`, data)

}

export const updateItem = (slug: string, data: Partial<TItemRequest>): Promise<AxiosResponse<TItemResponse>> => {
  return api.put(`/api/items/${slug}`, data)
}

export const destroyItem = (slug: string): Promise<AxiosResponse<void>> => {
  return api.put(`/api/items/${slug}`)
}