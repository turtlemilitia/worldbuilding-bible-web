import { useDataManager, TDataManager } from '../useDataManager'
import { TCampaign } from '@/types'
import CampaignService, { TCampaignRequest } from '../../../services/ApiService/Campaigns/CampaignService'
import { useImageableDataManager, hasImageableDataManager } from '@/hooks/DataManagers'
import { campaignSlice } from '@/reducers/campaign/campaignSlice'
import { campaignsIndexSlice } from '@/reducers/campaign/campaignsIndexSlice'
import campaignService from '../../../services/ApiService/Campaigns/CampaignService'
import {
  useAttachableDataManager,
  hasNotesAttachableDataManager,
  hasPinsAttachableDataManager,
  usePinnableDataManager, hasPermissionsAttachableDataManager, usePermissionableDataManager
} from '../useAttachableDataManager'

type TCampaignDataManager = TDataManager<TCampaign, TCampaignRequest> & {
  campaign?: TCampaign,
  createInvitation: (slug: string, email: string) => Promise<any>
} & hasNotesAttachableDataManager & hasImageableDataManager & hasPinsAttachableDataManager & hasPermissionsAttachableDataManager

const useCampaignDataManager = (): TCampaignDataManager => {
  const manager = useDataManager(
    'campaign',
    campaignSlice,
    campaignsIndexSlice,
    CampaignService,
  )
  return {
    ...manager,
    campaign: manager.entity,
    isPermanent: true,
    notes: useAttachableDataManager('notes', campaignSlice, campaignService.notes),
    images: useImageableDataManager(campaignSlice, campaignService.images),
    pins: usePinnableDataManager(campaignSlice, campaignService.pins),
    permissions: usePermissionableDataManager(campaignSlice, campaignService.permissions),
    createInvitation: (slug: string, email: string) => CampaignService.createInvitation(slug, { email }).
      then((response) => {
        const newInvitationData = response.data.data;
        manager.setChildData('invitations', newInvitationData)
      })
  }
}

export default useCampaignDataManager