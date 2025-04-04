import { useDataManager, TDataManager } from '../useDataManager'
import { TCampaign } from '@/types'
import CampaignService, { TCampaignRequest } from '../../../services/ApiService/Campaigns/CampaignService'
import { useImageableDataManager, hasImageableDataManager } from '@/hooks/DataManagers'
import { campaignsIndexSlice } from '@/reducers/campaign/campaignsIndexSlice'
import campaignService from '../../../services/ApiService/Campaigns/CampaignService'
import {
  useAttachableDataManager,
  hasNotesAttachableDataManager,
  hasPinsAttachableDataManager,
  usePinnableDataManager, hasPermissionsAttachableDataManager, usePermissionableDataManager
} from '../useAttachableDataManager'

export type TCampaignDataManager = TDataManager<TCampaign, TCampaignRequest> & {
  campaign?: TCampaign,
  createInvitation: (email: string) => (Promise<any> | null)
} & hasNotesAttachableDataManager & hasImageableDataManager & hasPinsAttachableDataManager & hasPermissionsAttachableDataManager

const useCampaignDataManager = (id?: number): TCampaignDataManager => {
  const manager = useDataManager(
    'campaigns',
    id,
    campaignsIndexSlice,
    CampaignService,
  )
  return {
    ...manager,
    campaign: manager.entity,
    isPermanent: true,
    notes: useAttachableDataManager('notes', manager, campaignService.notes),
    images: useImageableDataManager(manager, campaignService.images),
    pins: usePinnableDataManager(manager, campaignService.pins),
    permissions: usePermissionableDataManager(manager, campaignService.permissions),
    createInvitation: (email: string) => id ? CampaignService.createInvitation(id, { email }).
      then((response) => {
        const newInvitationData = response.data.data;
        manager.setChildData(id, 'invitations', newInvitationData)
      }) : null
  }
}

export default useCampaignDataManager