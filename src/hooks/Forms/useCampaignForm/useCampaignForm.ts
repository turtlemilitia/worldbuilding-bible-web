import { TCampaign } from '../../../types'
import { TCampaignRequest } from '../../../services/ApiService/Campaigns/CampaignService'
import { TForm, TUseFormProps } from '../../../components/Post/types'
import { useCampaignDataManager } from '../../DataManagers'
import { useCallback } from 'react'
import usePostForm from '../usePostForm'
import useCampaignFields from './useCampaignFields'

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

  const { fields } = useCampaignFields();

  const mapData = useCallback((data: TCampaign): TCampaignRequest => ({
    name: data.name,
    content: data.content,
    compendiumId: data.compendium?.id
  }), [])

  return usePostForm({
    id: campaignId,
    mapData,
    include: '',
    manager,
    fields,

    onFetched,
    onCreated,
    onUpdated,
    onDeleted
  })
}

export default useCampaignForm
