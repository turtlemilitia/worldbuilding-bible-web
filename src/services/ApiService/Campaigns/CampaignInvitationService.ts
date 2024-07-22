import { TInvitation } from '../../../types'
import { AxiosResponse } from 'axios'
import api from '../../../api'
import { TQueryParams } from '../types'

type TInvitationResponse = {
  data: TInvitation;
}

const CampaignInvitationService = {
  check: (campaignSlug: string, token: string, query: TQueryParams = {}): Promise<AxiosResponse<TInvitationResponse>> => {

    return api.get(`/api/campaigns/${campaignSlug}/invitations/${token}?${new URLSearchParams(query).toString()}`)

  },
  confirm: (campaignSlug: string, token: string, query: TQueryParams = {}): Promise<AxiosResponse<TInvitationResponse>> => {

    return api.post(`/api/campaigns/${campaignSlug}/invitations/${token}/confirm?${new URLSearchParams(query).toString()}`)

  }
}

export default CampaignInvitationService