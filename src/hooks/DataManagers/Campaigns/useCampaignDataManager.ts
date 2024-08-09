import { useDataManager, TDataManager } from '../useDataManager'
import { TCampaign } from '../../../types'
import CampaignService, { TCampaignRequest } from '../../../services/ApiService/Campaigns/CampaignService'
import { useImageableDataManager, hasImageableDataManager } from '../useImageableDataManager'
import { campaignSlice } from '../../../reducers/campaign/campaignSlice'
import { campaignsIndexSlice } from '../../../reducers/campaign/campaignsIndexSlice'
import campaignService from '../../../services/ApiService/Campaigns/CampaignService'
import { useAttachableDataManager, hasNotesAttachableDataManager } from '../useAttachableDataManager'

type TCampaignDataManager = TDataManager<TCampaign, TCampaignRequest> & {
  campaign?: TCampaign
} & hasNotesAttachableDataManager & hasImageableDataManager

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
    images: useImageableDataManager(campaignSlice, campaignService.images)

  }
}

export default useCampaignDataManager