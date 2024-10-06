import { TCampaign } from '@/types'
import { TCampaignRequest } from '@/services/ApiService/Campaigns/CampaignService'
import { TForm, TUseFormProps } from '@/components/Post/types'
import { useCampaignDataManager } from '../../DataManagers'
import { useCallback } from 'react'
import usePostForm from '../usePostForm'
import useCampaignFields from './useCampaignFields'
import useLink from '@/hooks/useLink'

export const campaignIncludes = 'compendium;notes;quests;quests.type;quests.parent;encounters;encounters.type;sessions;scenes;pins;pins.pinnable;users;users.pins;users.pins.pinnable;users.characters;permissions;users.permissions;gameMaster';

type TOwnProps = {
  campaignId: TCampaign['slug'];
}
const useCampaignForm = ({
  campaignId,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TCampaign>): TForm<TCampaign> => {

  const manager = useCampaignDataManager()

  const { fields } = useCampaignFields(campaignId);

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
