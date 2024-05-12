import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

const useUrlFormatter = () => {

  const { campaignId, compendiumId } = useParams()

  // pages can be under the campaign or the compendium itself
  const compendiumPath = useMemo(() => `${ campaignId ? `/campaigns/${campaignId}` : '' }/compendia/${compendiumId}`, [campaignId, compendiumId])

  return {
    compendiumPath
  }
}

export default useUrlFormatter