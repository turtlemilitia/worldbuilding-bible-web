import { useAppDispatch, useAppSelector } from '../../hooks'
import { RootState } from '../../store'
import { TUseForm } from '../../components/Post/types'
import { TNote, TNotebook } from '../../types'
import { destroyNote, storeNote, TNoteRequest, updateNote, viewNote } from '../../services/NoteService'
import useFormHandling from '../useFormHandling'
import {
  addNotebooksNotebookNote,
  removeNotebooksNotebookNote,
  updateNotebooksNotebookNote
} from '../../reducers/notebook/notebooksIndexSlice'
import { clearNoteData, setNoteData, updateNoteData } from '../../reducers/notebook/note/noteSlice'

type TProps = {
  isNew: boolean;
  isOpen: boolean;
  setIsOpen: (open: boolean) => any;
  notebookId: TNotebook['slug'];
  id: TNote['slug'];
  onCreated?: (data: TNote) => any;
  onUpdated?: (data: TNote) => any;
  onDeleted?: (id: TNote['slug']) => any;
}
const useNoteDialogForm = ({
  notebookId,
  id,
  isNew,
  setIsOpen,
  onCreated,
  onUpdated,
  onDeleted
}: TProps): TUseForm<TNote> => {

  // redux
  const dispatch = useAppDispatch()

  const { note: persistedData } = useAppSelector((state: RootState) => state.note) // redux

  const readyDataForRequest = (data: any): TNoteRequest => ({
    name: data.name,
    content: data.content,
  })


  const handleSetPersistedData = (data?: TNote) => dispatch(setNoteData(data))
  const handleUpdatePersistedData = (data: Partial<TNote>) => dispatch(updateNoteData(data))

  const {
    errors,
    newData,
    fetchedData,
    updateAllData,
    loading,
    saving,
    handleOnFieldChange,
    handleOnFetch,
    handleOnSave,
    handleOnDelete,
  } = useFormHandling({
    isNew,
    mapData: readyDataForRequest,

    // API
    onFetch: () => viewNote(id).then(({ data }) => data.data),
    onCreate: (data: TNoteRequest) => storeNote(notebookId, readyDataForRequest(data)).then(({ data }) => data.data),
    onUpdate: (data: TNoteRequest) => updateNote(id, readyDataForRequest(data)).then(({ data }) => data.data),
    onDelete: () => destroyNote(id),
    onCreated: (data) => {
      dispatch(addNotebooksNotebookNote({ slug: notebookId, note: data }))
      onCreated && onCreated(data)
    },
    onUpdated: (data) => {
      dispatch(updateNotebooksNotebookNote({ slug: notebookId, note: data }))
      onUpdated && onUpdated(data)
    },
    onDeleted: () => {
      dispatch(removeNotebooksNotebookNote({ slug: notebookId, id }))
      onDeleted && onDeleted(id)
      setIsOpen(false)
    },

    // persisted data
    persistedData,
    setPersistedData: handleSetPersistedData,
    updatePersistedData: handleUpdatePersistedData,
    resetPersistedData: () => dispatch(clearNoteData(undefined))
  })

  return {
    persistedData,
    newData,
    fetchedData,

    errors,
    updatePersistedData: handleUpdatePersistedData,
    updateAllData,
    loading,
    saving,

    handleOnSave,
    handleOnFetch,
    handleOnDelete,
    handleOnFieldChange
  };
}

export default useNoteDialogForm