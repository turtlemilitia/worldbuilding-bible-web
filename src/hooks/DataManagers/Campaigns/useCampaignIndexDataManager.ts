import { TCampaign } from '../../../types'
import CampaignService from '../../../services/ApiService/Campaigns/CampaignService'
import { campaignsIndexSlice } from '../../../reducers/campaign/campaignsIndexSlice'
import { createIndexDataManager, TIndexDataManager } from '../createIndexDataManager'

type TCampaignIndexDataManager = TIndexDataManager<TCampaign> & {
  campaigns?: TCampaign[]
}

const useCampaignIndexDataManager = (): TCampaignIndexDataManager => {
  const manager = createIndexDataManager(
    'campaigns',
    campaignsIndexSlice,
    CampaignService,
  )
  return {
    ...manager,
    campaigns: manager.list,
  }
}

export default useCampaignIndexDataManager