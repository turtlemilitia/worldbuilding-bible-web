import { TCampaign } from '../../types'
import {
  destroyCampaign,
  storeCampaign,
  TCampaignRequest, updateCampaign,
  viewCampaign
} from '../../services/CampaignService'
import useFormHandling from '../useFormHandling'
import { useMemo } from 'react'
import { TUseForm, TUseFormProps } from '../../components/Post/types'

type TOwnProps = {
  campaignId: TCampaign['slug'];
}
const useCampaignForm = ({
  campaignId,
  isNew,
  persistedData,
  setPersistedData,
  updatePersistedData,
  resetPersistedData,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TCampaign>): TUseForm<TCampaign> => {

  const include = useMemo(() => 'compendium', [])

  const mapData = (data: TCampaign): TCampaignRequest => ({
    name: data.name,
    content: data.content,
    compendiumId: data.compendium?.id
  })

  const onFetch = () => viewCampaign(campaignId, { include: `${include ? `${include};` : ''}images` }).then(({ data }) => data.data)

  const onCreate = (data: TCampaign): Promise<TCampaign> => storeCampaign(mapData(data), { include }).then((response) => response.data.data)

  const onUpdate = (data: TCampaign) => updateCampaign(campaignId, mapData(data), { include }).then(({ data }) => data.data)

  const onDelete = () => destroyCampaign(campaignId)

  return useFormHandling({
    id: campaignId,
    isNew,
    mapData,

    // API
    onFetch,
    onCreate,
    onUpdate,
    onDelete,
    onFetched,
    onCreated,
    onUpdated,
    onDeleted,

    // persisted data
    persistedData,
    setPersistedData,
    updatePersistedData,
    resetPersistedData
  })
}

export default useCampaignForm
