import { AxiosResponse } from 'axios'
import { TSession, TCampaign, TQueryParams } from '../types'
import api from '../api'

export interface TSessionRequest {
  name: string;
  content: string;
  scheduled_at: string;
  session_number: string;
  duration?: number
  location?: string
}
type TSessionResponse = {
  data: TSession;
}
type TSessionIndexResponse = {
  data: TSession[];
}

export const indexSessions = (campaignId: TCampaign['slug'], query: TQueryParams = {}): Promise<AxiosResponse<TSessionIndexResponse>> => {

  return api.get(`/api/campaigns/${campaignId}/sessions?${new URLSearchParams(query).toString()}`)

}

export const viewSession = (slug: string, query: TQueryParams = {}): Promise<AxiosResponse<TSessionResponse>> => {

  return api.get(`/api/sessions/${slug}?${new URLSearchParams(query).toString()}`)

}

export const storeSession = (campaignId: TCampaign['slug'], data: TSessionRequest): Promise<AxiosResponse<TSessionResponse>> => {

  return api.post(`/api/campaigns/${campaignId}/sessions`, data)

}

export const updateSession = (slug: string, data: Partial<TSessionRequest>): Promise<AxiosResponse<TSessionResponse>> => {
  return api.put(`/api/sessions/${slug}`, data)
}

export const destroySession = (slug: string): Promise<AxiosResponse<void>> => {
  return api.delete(`/api/sessions/${slug}`)
}