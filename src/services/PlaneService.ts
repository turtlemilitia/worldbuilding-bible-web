import { AxiosResponse } from 'axios'
import { TPlane, TCompendium } from '../types'
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

export const indexPlanes = (compendiumId: TCompendium['slug'], withArr: string[] = []): Promise<AxiosResponse<TPlaneIndexResponse>> => {

  return api.get(`/api/compendia/${compendiumId}/planes${withArr.length ? `?with=${withArr.join(',')}` : ''}`)

}

export const viewPlane = (slug: string, withArr: string[] = []): Promise<AxiosResponse<TPlaneResponse>> => {

  return api.get(`/api/planes/${slug}${withArr.length ? `?with=${withArr.join(',')}` : ''}`)

}

export const storePlane = (compendiumId: TCompendium['slug'], data: TPlaneRequest): Promise<AxiosResponse<TPlaneResponse>> => {

  return api.post(`/api/compendia/${compendiumId}/planes`, data)

}

export const updatePlane = (slug: string, data: Partial<TPlaneRequest>): Promise<AxiosResponse<TPlaneResponse>> => {
  return api.put(`/api/planes/${slug}`, data)
}

export const destroyPlane = (slug: string): Promise<AxiosResponse<void>> => {
  return api.put(`/api/planes/${slug}`)
}