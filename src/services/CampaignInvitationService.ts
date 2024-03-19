import { TInvitation, TQueryParams } from '../types'
import { AxiosResponse } from 'axios'
import api from '../api'

type TInvitationResponse = {
  data: TInvitation;
}
export const checkCampaignInvitation = (campaignSlug: string, token: string, query: TQueryParams = {}): Promise<AxiosResponse<TInvitationResponse>> => {

  return api.get(`/api/campaigns/${campaignSlug}/invitations/${token}?${new URLSearchParams(query).toString()}`)

}
export const confirmCampaignInvitation = (campaignSlug: string, token: string, query: TQueryParams = {}): Promise<AxiosResponse<TInvitationResponse>> => {

  return api.post(`/api/campaigns/${campaignSlug}/invitations/${token}/confirm?${new URLSearchParams(query).toString()}`)

}