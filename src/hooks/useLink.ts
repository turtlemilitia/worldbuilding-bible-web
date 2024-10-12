import useUrlFormatter from '@/hooks/useUrlFormatter'
import { useCampaignDataManager } from '@/hooks/DataManagers'

export const makeLink = (entityPath: string, id: string|number, compendiumPath: string, campaignPath?: string) => {

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
      prefix = `/campaigns/${campaignPath}`
      break
    case 'notes':
      prefix = `${campaignPath ? `/campaigns/${campaignPath}` : ''}`
      break
    case 'notebooks':
      prefix = `${campaignPath ? `/campaigns/${campaignPath}` : ''}/notes`
      break
  }

  return `${prefix}/${entityPath}/${id}`
}

const useLink = (entityPath: string, id: string | number): string => {

  const { compendiumPath } = useUrlFormatter()
  const { campaign } = useCampaignDataManager()

  return makeLink(entityPath, id, compendiumPath, campaign!.slug)
}

export default useLink;