import { AxiosResponse } from 'axios'
import { TCampaign, TGenericPostList, TInvitation, TQueryParams, TSession, TUser } from '../types'
import api from '../api'

export interface TCampaignRequest {
  name: string;
  content: string;
}
interface TCampaignResponse {
  data: TCampaign;
}
interface TCampaignIndexResponse {
  data: TGenericPostList[];
}

export const indexCampaigns = (query: TQueryParams = {}): Promise<AxiosResponse<TCampaignIndexResponse>> => {

  return api.get(`/api/campaigns?${new URLSearchParams(query).toString()}`)

}

export const viewCampaign = (slug: string, query: TQueryParams = {}): Promise<AxiosResponse<TCampaignResponse>> => {

  return api.get(`/api/campaigns/${slug}?${new URLSearchParams(query).toString()}`)

}

export const storeCampaign = (data: TCampaignRequest, query: TQueryParams = {}): Promise<AxiosResponse<TCampaignResponse>> => {

  return api.post(`/api/campaigns?${new URLSearchParams(query).toString()}`, data)

}

export const updateCampaign = (slug: string, data: Partial<TCampaignRequest>, query: TQueryParams = {}): Promise<AxiosResponse<TCampaignResponse>> => {
  return api.put(`/api/campaigns/${slug}?${new URLSearchParams(query).toString()}`, data)
}

export const destroyCampaign = (slug: string): Promise<AxiosResponse<void>> => {
  return api.delete(`/api/campaigns/${slug}`)
}

export type TCampaignInvitationStoreRequest = {
  email: TInvitation['email']
}

type TInvitationResponse = {
  data: TInvitation
}
export const createCampaignInvitation = (slug: TCampaign['slug'], data: TCampaignInvitationStoreRequest): Promise<AxiosResponse<TInvitationResponse>> => {
  return api.post(`/api/campaigns/${slug}/invitations`, data)
}