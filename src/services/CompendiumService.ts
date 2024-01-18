import { AxiosResponse } from 'axios'
import { TCompendium, TQueryParams } from '../types'
import api from '../api'

export type TCompendiumRequest = {
  name: TCompendium['name'];
  content: TCompendium['content'];
}
interface TCompendiumResponse {
  data: TCompendium;
}
interface TCompendiumIndexResponse {
  data: TCompendium[];
}

export const indexCompendia = (): Promise<AxiosResponse<TCompendiumIndexResponse>> => {

  return api.get(`/api/compendia`)

}

export const viewCompendium = (slug: string, query: TQueryParams = {}): Promise<AxiosResponse<TCompendiumResponse>> => {

  return api.get(`/api/compendia/${slug}?${new URLSearchParams(query).toString()}`)

}

export const storeCompendium = (data: TCompendiumRequest): Promise<AxiosResponse<TCompendiumResponse>> => {

  return api.post(`/api/compendia`, data)

}

export const updateCompendium = (slug: string, data: TCompendiumRequest): Promise<AxiosResponse<TCompendiumResponse>> => {
  return api.put(`/api/compendia/${slug}`, data)
}

export const destroyCompendium = (slug: string): Promise<AxiosResponse<void>> => {
  return api.put(`/api/compendia/${slug}`)
}