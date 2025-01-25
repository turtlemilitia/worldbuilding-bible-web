import { useCampaignDataManager } from '@/hooks/DataManagers'
import { useParams } from 'react-router-dom'
import { fixId } from '@/utils/dataUtils'

export const useCurrentCampaign = () => {

  const { campaignId } = useParams() as { campaignId: string }

  return {
    ...useCampaignDataManager(fixId(campaignId)),
  }
}