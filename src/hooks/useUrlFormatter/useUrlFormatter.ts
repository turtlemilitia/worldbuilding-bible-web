import { useMemo } from 'react'
import { useCurrentCampaign } from '@/hooks/useCurrentCampaign'
import { useCurrentCompendium } from '@/hooks/useCurrentCompendium'

const useUrlFormatter = () => {

  const { campaign} = useCurrentCampaign() // redux
  const { compendium} = useCurrentCompendium() // redux

  // pages can be under the campaign or the compendium itself
  const compendiumPath = useMemo(() => `${ campaign ? `/campaigns/${campaign.slug}` : '' }/compendia/${compendium?.slug}`, [campaign?.slug, compendium?.slug])

  return {
    compendiumPath
  }
}

export default useUrlFormatter