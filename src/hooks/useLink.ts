import useUrlFormatter from '@/hooks/useUrlFormatter'
import { useCampaignDataManager } from '@/hooks/DataManagers'
import { useCurrentCampaign } from '@/hooks/useCurrentCampaign'

export const makeLink = (entityPath: string, id: number, slug: string, compendiumPath: string, campaignPath?: string) => {

  let prefix = ''

  switch (entityPath) {
    case  'characters':
    case  'concepts':
    case  'currencies':
    case  'deities':
    case  'factions':
    case  'items':
    case  'languages':
    case  'locations':
    case  'natural-resources':
    case  'pantheons':
    case  'planes':
    case  'religions':
    case  'species':
    case  'spells':
    case  'stories':
      prefix = compendiumPath
      break
    case 'scenes':
    case 'quests':
    case 'encounters':
    case 'sessions':
      prefix = campaignPath ?? ''
      break
    case 'notes':
      prefix = campaignPath ?? ''
      break
  }

  return `${prefix}/${entityPath}/${id}/${slug}`
}

const useLink = (entityPath: string, id?: number, slug?: string): string => {

  const { compendiumPath, campaignPath } = useUrlFormatter()

  if (!id) {
    return ''
  }

  return makeLink(entityPath, id, slug ?? '', compendiumPath, campaignPath)
}

export default useLink;