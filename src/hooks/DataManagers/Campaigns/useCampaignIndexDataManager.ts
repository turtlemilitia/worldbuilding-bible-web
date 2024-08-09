import { TCampaign } from '../../../types'
import CampaignService from '../../../services/ApiService/Campaigns/CampaignService'
import { campaignsIndexSlice } from '../../../reducers/campaign/campaignsIndexSlice'
import { useIndexDataManager, TIndexDataManager } from '../useIndexDataManager'

type TCampaignIndexDataManager = TIndexDataManager<TCampaign> & {
  campaigns?: TCampaign[]
}

const useCampaignIndexDataManager = (): TCampaignIndexDataManager => {
  const manager = useIndexDataManager(
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