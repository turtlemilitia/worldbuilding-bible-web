import { useCompendiumDataManager } from '@/hooks/DataManagers'
import { useParams } from 'react-router-dom'
import { fixId } from '@/utils/dataUtils'

export const useCurrentCompendium = () => {

  const { compendiumId } = useParams() as { compendiumId: string }

  return {
    ...useCompendiumDataManager(fixId(compendiumId)),
  }
}