import { createDataManager, TDataManager } from '../createDataManager'
import { TCampaign } from '../../../types'
import CampaignService, { TCampaignRequest } from '../../../services/ApiService/Campaigns/CampaignService'
import { createImageableDataManager, hasImageableDataManager } from '../createImageableDataManager'
import { campaignSlice } from '../../../reducers/campaign/campaignSlice'
import { campaignsIndexSlice } from '../../../reducers/campaign/campaignsIndexSlice'
import { useMemo } from 'react'
import campaignService from '../../../services/ApiService/Campaigns/CampaignService'
import { createAttachableDataManager, hasNotesAttachableDataManager } from '../createAttachableDataManager'

type TCampaignDataManager = TDataManager<TCampaign, TCampaignRequest> & {
  campaign?: TCampaign
} & hasNotesAttachableDataManager & hasImageableDataManager

const useCampaignDataManager = (): TCampaignDataManager => {
  const manager = createDataManager(
    'campaign',
    campaignSlice,
    campaignsIndexSlice,
    CampaignService,
  )
  return {
    ...manager,
    campaign: manager.entity,
    notes: useMemo(() => createAttachableDataManager('notes', campaignSlice, campaignService.notes), []),
    images: useMemo(() => createImageableDataManager(campaignSlice, campaignService.images), [])

  }
}

export default useCampaignDataManager