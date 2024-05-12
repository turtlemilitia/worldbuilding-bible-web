import React, { JSX } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../../store'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { clearNoteData, setNoteData, updateNoteData } from '../../../reducers/notebook/note/noteSlice'
import { destroyNote, storeNote, TNoteRequest, updateNote, viewNote } from '../../../services/NoteService'
import { TNote } from '../../../types'
import { updateNotebookData } from '../../../reducers/notebook/notebookSlice'
import {
  addNotebooksNotebookNote,
  removeNotebooksNotebookNote,
  updateNotebooksNotebookNote
} from '../../../reducers/notebook/notebooksIndexSlice'
import Post from '../../../components/Post/Post'
import { TDeityRequest } from '../../../services/DeityService'

const Note = (): JSX.Element => {

  const dispatch = useAppDispatch() // redux

  const navigate = useNavigate()

  const { notebookId, noteId } = useParams() as { notebookId: string, noteId: string } // router

  const { note } = useAppSelector((state: RootState) => state.note) // redux

  const readyDataForRequest = (data: any): TDeityRequest => ({
    name: data.name,
    content: data.content,
  })

  return (
    <Post
      key={noteId}
      isNew={noteId === 'new'}
      pageTypeName={'Note'}
      canEdit={note.canUpdate}
      canDelete={note.canDelete}
      ready={true}

      onFetch={() => viewNote(noteId).then(({ data }) => data.data)}
      onCreate={(data: TNoteRequest) => storeNote(notebookId, readyDataForRequest(data)).then(({ data }) => data.data)}
      onUpdate={(data: TNoteRequest) => updateNote(noteId, readyDataForRequest(data)).then(({ data }) => data.data)}
      onDelete={() => destroyNote(noteId)}
      onCreated={(data) => {
        dispatch(updateNotebookData({ hasNotes: true }))
        dispatch(addNotebooksNotebookNote({ slug: notebookId, note: data }))
        navigate(`/notebooks/${notebookId}/notes/${data.slug}`)
      }}
      onUpdated={(data) => {
        dispatch(updateNotebooksNotebookNote({ slug: notebookId, note: data }))
      }}
      onDeleted={() => {
        dispatch(removeNotebooksNotebookNote({ slug: notebookId, noteId }))
        navigate(`/notebooks/${notebookId}`)
      }}

      fields={[]}

      persistedData={note as TNote}
      setPersistedData={(data) => dispatch(setNoteData(data))}
      updatePersistedData={(data) => dispatch(updateNoteData(data))}
      resetPersistedData={() => dispatch(clearNoteData(undefined))}
    />
  )
}

export default Note
