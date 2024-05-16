import {TNotebook, TNote} from '../../types'
import {
  destroyNote,
  storeNote,
  TNoteRequest, updateNote,
  viewNote
} from '../../services/NoteService'
import useFormHandling from '../useFormHandling'
import { useMemo } from 'react'
import { TUseForm, TUseFormProps } from '../../components/Post/types'

type TOwnProps = {
  notebookId: TNotebook['slug'];
  noteId: TNote['slug'];
}
const useNoteForm = ({
  notebookId,
  noteId,
  isNew,
  persistedData,
  setPersistedData,
  updatePersistedData,
  resetPersistedData,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TNote>): TUseForm<TNote> => {

  const include = useMemo(() => '', [])

  const mapData = (data: any): TNoteRequest => ({
    name: data.name,
    content: data.content,
  })

  const onFetch = () => viewNote(noteId, { include: `${include};notes;images` }).then(({ data }) => data.data)

  const onCreate = (data: TNote): Promise<TNote> => storeNote(notebookId, mapData(data), { include }).then((response) => response.data.data)

  const onUpdate = (data: TNoteRequest) => updateNote(notebookId, mapData(data)).then(({data}) => data.data)

  const onDelete = () => destroyNote(noteId);

  return useFormHandling({
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

export default useNoteForm;
