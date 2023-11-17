import { AxiosResponse } from 'axios'
import { TNaturalResource, TCompendium, TQueryParams } from '../types'
import api from '../api'

export interface TNaturalResourceRequest {
  name: string;
  content: string;
}
type TNaturalResourceResponse = {
  data: TNaturalResource;
}
type TNaturalResourceIndexResponse = {
  data: TNaturalResource[];
}

export const indexNaturalResources = (compendiumId: TCompendium['slug'], query: TQueryParams = {}): Promise<AxiosResponse<TNaturalResourceIndexResponse>> => {

  return api.get(`/api/compendia/${compendiumId}/natural-resources?${new URLSearchParams(query).toString()}`)

}

export const viewNaturalResource = (slug: string, query: TQueryParams = {}): Promise<AxiosResponse<TNaturalResourceResponse>> => {

  return api.get(`/api/natural-resources/${slug}?${new URLSearchParams(query).toString()}`)

}

export const storeNaturalResource = (compendiumId: TCompendium['slug'], data: TNaturalResourceRequest): Promise<AxiosResponse<TNaturalResourceResponse>> => {

  return api.post(`/api/compendia/${compendiumId}/natural-resources`, data)

}

export const updateNaturalResource = (slug: string, data: Partial<TNaturalResourceRequest>): Promise<AxiosResponse<TNaturalResourceResponse>> => {
  return api.put(`/api/natural-resources/${slug}`, data)
}

export const destroyNaturalResource = (slug: string): Promise<AxiosResponse<void>> => {
  return api.put(`/api/natural-resources/${slug}`)
}