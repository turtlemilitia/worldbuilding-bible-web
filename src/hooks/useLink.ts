import useUrlFormatter from '@/hooks/useUrlFormatter'
import { useCampaignDataManager } from '@/hooks/DataManagers'
import { useCurrentCampaign } from '@/hooks/useCurrentCampaign'

export const makeLink = (entityPath: string, id: number, slug: string, compendiumPath: string, campaignSlug?: string) => {

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
      prefix = `/campaigns/${campaignSlug}`
      break
    case 'notes':
      prefix = `${campaignSlug ? `/campaigns/${campaignSlug}` : ''}`
      break
  }

  return `${prefix}/${entityPath}/${id}/${slug}`
}

const useLink = (entityPath: string, id: number, slug?: string): string => {

  const { compendiumPath } = useUrlFormatter()
  const { campaign } = useCurrentCampaign()

  return makeLink(entityPath, id, slug ?? '', compendiumPath, campaign?.slug)
}

export default useLink;