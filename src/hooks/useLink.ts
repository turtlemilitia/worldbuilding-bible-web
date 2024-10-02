import useUrlFormatter from '@/hooks/useUrlFormatter'
import { useCampaignDataManager } from '@/hooks/DataManagers'

type TEntityLink =
  'compendia' |
  'characters' |
  'concepts' |
  'currencies' |
  'deities' |
  'factions' |
  'items' |
  'languages' |
  'locations' |
  'natural-resources' |
  'pantheons' |
  'planes' |
  'religions' |
  'species' |
  'spells' |
  'stories' |
  'systems' |
  'campaigns' |
  'scenes' |
  'quests' |
  'encounters' |
  'sessions' |
  'notes' |
  'notebooks';

const useLink = (entityPath: TEntityLink, id: string | number): string => {

  const { compendiumPath } = useUrlFormatter()
  const { campaign } = useCampaignDataManager()

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
      prefix = `/campaigns/${campaign?.slug}`
      break
    case 'notebooks':
      prefix = `/notes`
      break
  }

  return `${prefix}/${entityPath}/${id}`
}

export default useLink;