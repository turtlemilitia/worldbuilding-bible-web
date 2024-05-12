import { useAppDispatch, useAppSelector } from '../../hooks'
import { RootState } from '../../store'
import { TDeityRequest } from '../../services/DeityService'
import { destroyNote, storeNote, TNoteRequest, updateNote, viewNote } from '../../services/NoteService'
import {
  addNotebooksNotebookNote,
  removeNotebooksNotebookNote,
  updateNotebooksNotebookNote
} from '../../reducers/notebook/notebooksIndexSlice'
import { TNote, TNotebook } from '../../types'
import { clearNoteData, setNoteData, updateNoteData } from '../../reducers/notebook/note/noteSlice'
import React, { FunctionComponent } from 'react'
import PostDialog from '../PostDialog/PostDialog'

type TProps = {
  isOpen: boolean,
  setIsOpen: (open: boolean) => any;
  notebookId: TNotebook['slug'];
  id: TNote['slug'];
  onCreated?: (data: TNote) => any;
  onUpdated?: (data: TNote) => any;
  onDeleted?: (id: TNote['slug']) => any;
}
const NoteDialog: FunctionComponent<TProps> = ({isOpen, setIsOpen, notebookId, id, onCreated, onUpdated, onDeleted}) => {

  const dispatch = useAppDispatch() // redux

  const { note } = useAppSelector((state: RootState) => state.note) // redux

  const readyDataForRequest = (data: any): TDeityRequest => ({
    name: data.name,
    content: data.content,
  })

  return (
    <PostDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      isNew={id === 'new'}
      pageTypeName={'Note'}
      canEdit={note.canUpdate}
      canDelete={note.canDelete}
      ready={true}

      onFetch={() => viewNote(id).then(({ data }) => data.data)}
      onCreate={(data: TNoteRequest) => {
        return storeNote(notebookId, readyDataForRequest(data)).then(({ data }) => data.data) }}
      onUpdate={(data: TNoteRequest) => updateNote(id, readyDataForRequest(data)).then(({ data }) => data.data)}
      onDelete={() => destroyNote(id)}
      onCreated={(data) => {
        dispatch(addNotebooksNotebookNote({ slug: notebookId, note: data }))
        onCreated && onCreated(data)
      }}
      onUpdated={(data) => {
        dispatch(updateNotebooksNotebookNote({ slug: notebookId, note: data }))
        onUpdated && onUpdated(data)
      }}
      onDeleted={() => {
        dispatch(removeNotebooksNotebookNote({ slug: notebookId, id }))
        onDeleted && onDeleted(id)
        setIsOpen(false)
      }}

      fields={[]}

      persistedData={note as TNote}
      setPersistedData={(data) => dispatch(setNoteData(data))}
      updatePersistedData={(data) => dispatch(updateNoteData(data))}
      resetPersistedData={() => dispatch(clearNoteData(undefined))}
    />
  )
}

export default NoteDialog