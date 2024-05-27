import {TCompendium, TStory} from '../../types'
import {
  destroyStory,
  storeStory,
  TStoryRequest, updateStory,
  viewStory
} from '../../services/StoryService'
import useFormHandling from '../useFormHandling'
import { useMemo } from 'react'
import { TUseForm, TUseFormProps } from '../../components/Post/types'

type TOwnProps = {
  compendiumId: TCompendium['slug'];
  storyId: TStory['slug'];
}
const useStoryForm = ({
  compendiumId,
  storyId,
  isNew,
  persistedData,
  setPersistedData,
  updatePersistedData,
  resetPersistedData,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TStory>): TUseForm<TStory> => {

  const include = useMemo(() => '', [])

  const mapData = (data: any): TStoryRequest => ({
    name: data.name,
    content: data.content,
  })

  const onFetch = () => viewStory(storyId, { include: `${include ? `${include};` : ''}notes;images` }).then(({ data }) => data.data)

  const onCreate = (data: TStory): Promise<TStory> => storeStory(compendiumId, mapData(data), { include }).then((response) => response.data.data)

  const onUpdate = (data: TStoryRequest) => updateStory(storyId, mapData(data)).then(({data}) => data.data)

  const onDelete = () => destroyStory(storyId);

  return useFormHandling({
    id: storyId,
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

export default useStoryForm;
