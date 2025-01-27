import { TCampaign, TQuest } from '@/types'
import { TQuestRequest } from '@/services/ApiService/Campaigns/QuestService'
import { useCallback, useMemo } from 'react'
import { TForm, TUseFormProps } from '@/components/Post/types'
import { useQuestDataManager } from '../../DataManagers'
import usePostForm from '../usePostForm'
import useQuestFields from './useQuestFields'
import useLink from '@/hooks/useLink'

type TOwnProps = {
  campaignId?: TCampaign['id']
  questId?: TQuest['id'];
}
const useQuestForm = ({
  campaignId,
  questId,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted
}: TOwnProps & TUseFormProps<TQuest>): TForm<TQuest> => {

  const include = useMemo(() => 'type;parent;notes;locations', [])

  const manager = useQuestDataManager(campaignId, questId)

  const { fields } = useQuestFields(manager)

  const mapData = useCallback((data: TQuest): TQuestRequest => ({
    name: data.name,
    content: data.content,
    typeId: data.type?.id,
    parentId: data.parent?.id,
    completedAt: data.completedAt,
  }), []);

  return usePostForm({
    id: questId,
    mapData,
    include,
    manager,
    fields,

    onFetched,
    onCreated,
    onUpdated,
    onDeleted,
    link: useLink('quests', questId)
  })
}

export default useQuestForm
