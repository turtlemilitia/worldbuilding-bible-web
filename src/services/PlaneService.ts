import { AxiosResponse } from 'axios'
import { TPlane, TCompendium, TQueryParams } from '../types'
import api from '../api'

export interface TPlaneRequest {
  name: string;
  content: string;
}
type TPlaneResponse = {
  data: TPlane;
}
type TPlaneIndexResponse = {
  data: TPlane[];
}

export const indexPlanes = (compendiumId: TCompendium['slug'], query: TQueryParams = {}): Promise<AxiosResponse<TPlaneIndexResponse>> => {

  return api.get(`/api/compendia/${compendiumId}/planes?${new URLSearchParams(query).toString()}`)

}

export const viewPlane = (slug: string, query: TQueryParams = {}): Promise<AxiosResponse<TPlaneResponse>> => {

  return api.get(`/api/planes/${slug}?${new URLSearchParams(query).toString()}`)

}

export const storePlane = (compendiumId: TCompendium['slug'], data: TPlaneRequest): Promise<AxiosResponse<TPlaneResponse>> => {

  return api.post(`/api/compendia/${compendiumId}/planes`, data)

}

export const updatePlane = (slug: string, data: Partial<TPlaneRequest>): Promise<AxiosResponse<TPlaneResponse>> => {
  return api.put(`/api/planes/${slug}`, data)
}

export const destroyPlane = (slug: string): Promise<AxiosResponse<void>> => {
  return api.delete(`/api/planes/${slug}`)
}