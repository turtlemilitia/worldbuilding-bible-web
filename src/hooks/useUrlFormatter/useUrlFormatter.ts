import { useMemo } from 'react'
import { useCurrentCampaign } from '@/hooks/useCurrentCampaign'
import { useCurrentCompendium } from '@/hooks/useCurrentCompendium'

const useUrlFormatter = () => {

  const { campaign } = useCurrentCampaign() // redux
  const { compendium } = useCurrentCompendium() // redux

  // pages can be under the campaign or the compendium itself
  const compendiumPath = useMemo(() => `${ campaign ? `/campaigns/${campaign.id}/${campaign.slug}` : '' }/compendia/${compendium?.id}/${compendium?.slug}`, [campaign?.id, campaign?.slug, compendium?.id, compendium?.slug])
  const campaignPath = useMemo(() => `/campaigns/${campaign?.id}/${campaign?.slug}`, [campaign?.id, campaign?.slug])

  return {
    compendiumPath,
    campaignPath
  }
}

export default useUrlFormatter