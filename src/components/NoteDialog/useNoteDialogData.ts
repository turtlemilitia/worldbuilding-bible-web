import {useState} from "react";
import {TNote, TNotebook} from "../../types";
import {
  addNotebooksNotebookNote,
  removeNotebooksNotebookNote,
  updateNotebooksNotebookNote
} from "../../reducers/notebook/notebooksIndexSlice";
import {useDispatch} from "react-redux";

type TProps = {
  notebookId: TNotebook['slug'],
  noteId: TNote['slug'],
  setIsOpen: (open: boolean) => any;
  onCreated?: (data: TNote) => any;
  onUpdated?: (data: Partial<TNote>) => any;
  onDeleted?: (id: TNote['slug']) => any;
}
const useNoteDialogData = ({
  notebookId,
  noteId,
  setIsOpen,
  onCreated,
  onUpdated,
  onDeleted
}: TProps) => {

  const dispatch = useDispatch()

  const [note, setNote] = useState<TNote>();

  return {
    notebookId,
    noteId,
    persistedData: note,
    setPersistedData: (data?: TNote) => setNote(data),
    updatePersistedData: (data: Partial<TNote>) => setNote(prevState => ({...prevState as TNote, ...data})),
    resetPersistedData: () => setNote(undefined),
    onCreated: (data: TNote) => {
      dispatch(addNotebooksNotebookNote({slug: notebookId, note: data}))
      onCreated && onCreated(data)
    },
    onUpdated: (data: TNote) => {
      dispatch(updateNotebooksNotebookNote({slug: notebookId, note: data}))
      onUpdated && onUpdated(data)
    },
    onDeleted: () => {
      dispatch(removeNotebooksNotebookNote({slug: notebookId, noteId}))
      onDeleted && onDeleted(noteId)
      setIsOpen(false)
    },
  }
}

export default useNoteDialogData
