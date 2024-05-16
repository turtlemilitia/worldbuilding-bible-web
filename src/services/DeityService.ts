import { AxiosResponse } from 'axios'
import { TDeity, TCompendium, TQueryParams } from '../types'
import api from '../api'

export interface TDeityRequest {
  name: string;
  content: string;
}
type TDeityResponse = {
  data: TDeity;
}
type TDeityIndexResponse = {
  data: TDeity[];
}

export const indexDeities = (compendiumId: TCompendium['slug'], query: TQueryParams = {}): Promise<AxiosResponse<TDeityIndexResponse>> => {

  return api.get(`/api/compendia/${compendiumId}/deities?${new URLSearchParams(query).toString()}`)

}

export const viewDeity = (slug: string, query: TQueryParams = {}): Promise<AxiosResponse<TDeityResponse>> => {

  return api.get(`/api/deities/${slug}?${new URLSearchParams(query).toString()}`)

}

export const storeDeity = (compendiumId: TCompendium['slug'], data: TDeityRequest, query: TQueryParams = {}): Promise<AxiosResponse<TDeityResponse>> => {

  return api.post(`/api/compendia/${compendiumId}/deities?${new URLSearchParams(query).toString()}`, data)

}

export const updateDeity = (slug: string, data: Partial<TDeityRequest>, query: TQueryParams = {}): Promise<AxiosResponse<TDeityResponse>> => {
  return api.put(`/api/deities/${slug}?${new URLSearchParams(query).toString()}`, data)
}

export const destroyDeity = (slug: string): Promise<AxiosResponse<void>> => {
  return api.delete(`/api/deities/${slug}`)
}