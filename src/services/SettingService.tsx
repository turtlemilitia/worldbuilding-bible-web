import { AxiosResponse } from 'axios'
import { TSetting } from '../types'
import api from '../api'

interface TSettingResponse {
  data: TSetting;
}
interface TSettingIndexResponse {
  data: TSetting[];
}

export const indexSettings = (): Promise<AxiosResponse<TSettingIndexResponse>> => {

  return api.get(`/api/settings`)

}

export const viewSetting = (slug: string): Promise<AxiosResponse<TSettingResponse>> => {

  return api.get(`/api/settings/${slug}`)

}

export const storeSetting = (data: TSetting): Promise<AxiosResponse<TSettingResponse>> => {

  return api.post(`/api/settings`, data)

}

export const updateSetting = (slug: string, data: Partial<TSetting>): Promise<AxiosResponse<TSettingResponse>> => {
  return api.put(`/api/settings/${slug}`, data)
}

export const destroySetting = (slug: string): Promise<AxiosResponse<void>> => {
  return api.put(`/api/settings/${slug}`)
}