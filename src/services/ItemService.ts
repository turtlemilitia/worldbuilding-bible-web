import { AxiosResponse } from 'axios'
import { TItem, TCompendium, TQueryParams } from '../types'
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

export const indexItems = (compendiumId: TCompendium['slug'], query: TQueryParams = {}): Promise<AxiosResponse<TItemIndexResponse>> => {

  return api.get(`/api/compendia/${compendiumId}/items?${new URLSearchParams(query).toString()}`)

}

export const viewItem = (slug: string, query: TQueryParams = {}): Promise<AxiosResponse<TItemResponse>> => {

  return api.get(`/api/items/${slug}?${new URLSearchParams(query).toString()}`)

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