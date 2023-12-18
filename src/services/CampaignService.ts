import { AxiosResponse } from 'axios'
import { TCampaign } from '../types'
import api from '../api'

export interface TCampaignRequest {
  name: string;
  content: string;
  visibility: number;
}
interface TCampaignResponse {
  data: TCampaign;
}
interface TCampaignIndexResponse {
  data: TCampaign[];
}

export const indexCampaigns = (): Promise<AxiosResponse<TCampaignIndexResponse>> => {

  return api.get(`/api/campaigns`)

}

export const viewCampaign = (slug: string): Promise<AxiosResponse<TCampaignResponse>> => {

  return api.get(`/api/campaigns/${slug}`)

}

export const storeCampaign = (data: TCampaignRequest): Promise<AxiosResponse<TCampaignResponse>> => {

  return api.post(`/api/campaigns`, data)

}

export const updateCampaign = (slug: string, data: Partial<TCampaignRequest>): Promise<AxiosResponse<TCampaignResponse>> => {
  return api.put(`/api/campaigns/${slug}`, data)
}

export const destroyCampaign = (slug: string): Promise<AxiosResponse<void>> => {
  return api.put(`/api/campaigns/${slug}`)
}