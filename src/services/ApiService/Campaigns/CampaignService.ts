import { AxiosResponse } from 'axios'
import { TCampaign, TInvitation } from '@/types'
import api from '../../../api'
import { createApiService } from '../createApiService'
import { createImageableService } from '../createImageableService'
import { createNotableService } from '../createNotableService'
import { createPinnableService } from '../createPinnableService'
import { createPermissionableService } from '../createPermissionableService'

export interface TCampaignRequest {
  name: string;
  content: string;
  compendiumId?: number;
}

export type TCampaignResponse = TCampaign;

export type TCampaignIndexResponse = TCampaign[];

export type TInvitationResponse = TInvitation

export type TCampaignInvitationStoreRequest = {
  email: TInvitation['email']
}

const CampaignService = {
  ...createApiService<TCampaignRequest, TCampaignIndexResponse, TCampaignResponse>('campaigns'),
  ...createImageableService('campaigns'),
  ...createNotableService('campaigns'),
  ...createPinnableService('campaigns'),
  ...createPermissionableService('campaigns'),
  createInvitation: (slug: TCampaign['slug'], data: TCampaignInvitationStoreRequest): Promise<AxiosResponse<{ data: TInvitationResponse }>> => {

    return api.post(`/api/campaigns/${slug}/invitations`, data)

  },
  downloadSummary: async (id: string) => {
    try {
      const response = await api.get(`/api/campaigns/${id}/download`, {
        responseType: 'blob',
      });

      // Create a URL for the blob object and directly open it
      const blob = new Blob([response.data], {type: 'text/plain'});
      const blobUrl = window.URL.createObjectURL(blob);

      // Use `window.open` to trigger the download
      window.open(blobUrl);
    } catch (error) {
      console.error('Error downloading the file', error);
    }
  }
}

export default CampaignService