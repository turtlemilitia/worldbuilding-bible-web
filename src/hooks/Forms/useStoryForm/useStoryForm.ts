import { TCompendium, TStory } from '../../../types'
import { TStoryRequest } from '../../../services/ApiService/Compendia/StoryService'
import { useMemo } from 'react'
import { TForm, TUseFormProps } from '../../../components/Post/types'
import { usePostForm } from '../index'
import { useStoryDataManager } from '../../DataManagers'
import useStoryFields from '../useStoryForm/useStoryFields'
import useUrlFormatter from '@/hooks/useUrlFormatter'
import useLink from '@/hooks/useLink'

type TOwnProps = {
  compendiumId?: TCompendium['id'];
  storyId?: TStory['id'];
}
const useStoryForm = ({
  compendiumId,
  storyId,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TStory>): TForm<TStory> => {

  const include = useMemo(() => 'notes;encounters;quests', [])

  const manager = useStoryDataManager(compendiumId, storyId)

  const { fields } = useStoryFields(manager)

  const mapData = (data: any): TStoryRequest => ({
    name: data.name,
    content: data.content,
  })

  return usePostForm({
    id: storyId,
    mapData,
    include,
    manager,
    fields,

    onFetched,
    onCreated,
    onUpdated,
    onDeleted,
    link: storyId ? useLink('stories', storyId) : ''
  })
}

export default useStoryForm
