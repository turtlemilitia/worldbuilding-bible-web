import { useMemo } from 'react'
import { useCampaignDataManager, useCompendiumDataManager } from '../DataManagers'

const useUrlFormatter = () => {

  const { campaign} = useCampaignDataManager() // redux
  const { compendium} = useCompendiumDataManager() // redux

  // pages can be under the campaign or the compendium itself
  const compendiumPath = useMemo(() => `${ campaign ? `/campaigns/${campaign.slug}` : '' }/compendia/${compendium?.slug}`, [campaign?.slug, compendium?.slug])

  return {
    compendiumPath
  }
}

export default useUrlFormatter