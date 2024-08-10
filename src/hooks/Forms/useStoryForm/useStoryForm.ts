import { TStory } from '../../../types'
import { TStoryRequest } from '../../../services/ApiService/Compendia/StoryService'
import { useMemo } from 'react'
import { TForm, TUseFormProps } from '../../../components/Post/types'
import { usePostForm } from '../index'
import { useStoryDataManager } from '../../DataManagers'
import useStoryFields from '../useStoryForm/useStoryFields'

type TOwnProps = {
  storyId: TStory['slug'];
}
const useStoryForm = ({
  storyId,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TStory>): TForm<TStory> => {

  const include = useMemo(() => 'notes;encounters;quests', [])

  const manager = useStoryDataManager()

  const { fields } = useStoryFields()

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
    onDeleted
  })
}

export default useStoryForm
