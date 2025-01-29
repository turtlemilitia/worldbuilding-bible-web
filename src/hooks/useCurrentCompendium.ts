import { useCompendiumDataManager } from '@/hooks/DataManagers'
import { useParams } from 'react-router-dom'
import { fixId } from '@/utils/dataUtils'
import { useMemo } from 'react'
import { useCurrentCampaign } from '@/hooks/useCurrentCampaign'

export const useCurrentCompendium = () => {

  const { compendiumId: paramId } = useParams() as { compendiumId: string }

  const { campaign } = useCurrentCampaign();

  const compendiumId: string = useMemo(() => {
    if (campaign?.compendium && !paramId) {
      return String(campaign.compendium.id);
    } else {
      return paramId;
    }
  }, [campaign?.compendium, paramId]);

  const id = useMemo(() => fixId(compendiumId), [compendiumId])
  return {
    ...useCompendiumDataManager(id),
  }
}