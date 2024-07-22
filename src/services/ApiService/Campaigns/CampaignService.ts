import { AxiosResponse } from 'axios'
import { TCampaign, TGenericPostBasic, TInvitation } from '../../../types'
import api from '../../../api'
import { createApiService } from '../createApiService'
import { createImageableService } from '../createImageableService'
import { createNotableService } from '../createNotableService'

export interface TCampaignRequest {
  name: string;
  content: string;
  compendiumId?: number;
}

export type TCampaignResponse = TCampaign;

export type TCampaignIndexResponse = TGenericPostBasic[];

export type TInvitationResponse = TInvitation

export type TCampaignInvitationStoreRequest = {
  email: TInvitation['email']
}

const CampaignService = {
  ...createApiService<TCampaignRequest, TCampaignIndexResponse, TCampaignResponse>('campaigns'),
  ...createImageableService('campaigns'),
  ...createNotableService('campaigns'),
  createInvitation: (slug: TCampaign['slug'], data: TCampaignInvitationStoreRequest): Promise<AxiosResponse<{ data: TInvitationResponse }>> => {

    return api.post(`/api/campaigns/${slug}/invitations`, data)

  }
}

export default CampaignService