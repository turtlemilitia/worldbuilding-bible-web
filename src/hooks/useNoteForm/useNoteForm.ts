import {TUseForm, TUseFormProps} from '../../components/Post/types'
import { TNote, TNotebook } from '../../types'
import { destroyNote, storeNote, TNoteRequest, updateNote, viewNote } from '../../services/NoteService'
import useFormHandling from '../useFormHandling'

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

  const mapData = (data: any): TNoteRequest => ({
    name: data.name,
    content: data.content,
  })

  return useFormHandling({
    isNew,
    mapData,

    // API
    onFetch: () => viewNote(noteId).then(({ data }) => data.data),
    onCreate: (data: TNoteRequest) => storeNote(notebookId, mapData(data)).then(({ data }) => data.data),
    onUpdate: (data: TNoteRequest) => updateNote(noteId, mapData(data)).then(({ data }) => data.data),
    onDelete: () => destroyNote(noteId),
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

export default useNoteForm
