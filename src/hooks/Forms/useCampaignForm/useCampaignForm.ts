import { TCampaign } from '@/types'
import { TCampaignRequest } from '@/services/ApiService/Campaigns/CampaignService'
import { TForm, TUseFormProps } from '@/components/Post/types'
import { useCampaignDataManager } from '../../DataManagers'
import { useCallback } from 'react'
import usePostForm from '../usePostForm'
import useCampaignFields from './useCampaignFields'
import useLink from '@/hooks/useLink'

export const campaignIncludes = [
  'compendium',
  'notes',
  'quests', 'quests.type', 'quests.parent', 'quests.locations',
  'encounters', 'encounters.type', 'encounters.locations',
  'sessions',
  'scenes',
  'pins', 'pins.pinnable',
  'invitations',
  'users',
  'users.pins', 'users.pins.pinnable',
  'users.characters',
  'permissions', 'users.permissions',
  'gameMaster'
].join(';');

type TOwnProps = {
  campaignId?: TCampaign['id'];
}
const useCampaignForm = ({
  campaignId,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TCampaign>): TForm<TCampaign> => {

  const manager = useCampaignDataManager(campaignId)

  const { fields } = useCampaignFields(manager);

  const mapData = useCallback((data: TCampaign): TCampaignRequest => ({
    name: data.name,
    content: data.content,
    compendiumId: data.compendium?.id
  }), [])

  return usePostForm({
    fetchOnMount: false, // it's fetched on the Wrapper
    id: campaignId,
    mapData,
    include: campaignIncludes,
    manager,
    fields,

    onFetched,
    onCreated,
    onUpdated,
    onDeleted,
    link: useLink('campaigns', campaignId)
  })
}

export default useCampaignForm
