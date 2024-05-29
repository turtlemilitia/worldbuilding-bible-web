import {TCompendium, TNotebook} from '../../types'
import {
  destroyNotebook,
  storeNotebook,
  TNotebookRequest, updateNotebook,
  viewNotebook
} from '../../services/NotebookService'
import useFormHandling from '../useFormHandling'
import { useMemo } from 'react'
import { TUseForm, TUseFormProps } from '../../components/Post/types'

type TOwnProps = {
  notebookId: TNotebook['slug'];
}
const useNotebookForm = ({
  notebookId,
  isNew,
  persistedData,
  setPersistedData,
  updatePersistedData,
  resetPersistedData,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TNotebook>): TUseForm<TNotebook> => {

  const include = useMemo(() => '', [])

  const mapData = (data: any): TNotebookRequest => ({
    name: data.name,
    content: data.content,
  })

  const onFetch = () => viewNotebook(notebookId, { include: `${include ? `${include};` : ''}images` }).then(({ data }) => data.data)

  const onCreate = (data: TNotebook): Promise<TNotebook> => storeNotebook(mapData(data), { include }).then((response) => response.data.data)

  const onUpdate = (data: TNotebookRequest) => updateNotebook(notebookId, mapData(data)).then(({data}) => data.data)

  const onDelete = () => destroyNotebook(notebookId);

  return useFormHandling({
    id: notebookId,
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

export default useNotebookForm;
