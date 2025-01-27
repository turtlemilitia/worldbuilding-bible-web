import { useCompendiumDataManager } from '@/hooks/DataManagers'
import { useParams } from 'react-router-dom'
import { fixId } from '@/utils/dataUtils'
import { useMemo } from 'react'

export const useCurrentCompendium = () => {

  const { compendiumId } = useParams() as { compendiumId: string }

  const id = useMemo(() => fixId(compendiumId), [compendiumId])
  return {
    ...useCompendiumDataManager(id),
  }
}