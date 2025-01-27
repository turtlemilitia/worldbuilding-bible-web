import { useCampaignDataManager } from '@/hooks/DataManagers'
import { useParams } from 'react-router-dom'
import { fixId } from '@/utils/dataUtils'
import { useMemo } from 'react'

export const useCurrentCampaign = () => {

  const { campaignId } = useParams() as { campaignId: string }

  const id = useMemo(() => fixId(campaignId), [campaignId])

  return {
    ...useCampaignDataManager(id),
  }
}