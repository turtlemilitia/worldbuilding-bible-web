import { TCampaign, TQuest } from '../../types'
import {
  destroyQuest,
  storeQuest,
  TQuestRequest, updateQuest,
  viewQuest
} from '../../services/QuestService'
import useFormHandling from '../useFormHandling'
import { useMemo } from 'react'
import { TUseForm, TUseFormProps } from '../../components/Post/types'

type TOwnProps = {
  campaignId: TCampaign['slug'];
  questId: TQuest['slug'];
}
const useQuestForm = ({
  campaignId,
  questId,
  isNew,
  persistedData,
  setPersistedData,
  updatePersistedData,
  resetPersistedData,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TQuest>): TUseForm<TQuest> => {

  const include = useMemo(() => 'type;parent', [])

  const mapData = (data: any): TQuestRequest => ({
    name: data.name,
    content: data.content,
    typeId: data.type.id,
    parentId: data.parent?.id,
  })

  const onFetch = () => viewQuest(questId, { include: `${include ? `${include};` : ''}images` }).then(({ data }) => data.data)

  const onCreate = (data: TQuest): Promise<TQuest> => storeQuest(campaignId, mapData(data), { include }).then((response) => response.data.data)

  const onUpdate = (data: TQuestRequest) => updateQuest(questId, mapData(data), { include }).then(({data}) => data.data)

  const onDelete = () => destroyQuest(questId);

  return useFormHandling({
    id: questId,
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

export default useQuestForm;
