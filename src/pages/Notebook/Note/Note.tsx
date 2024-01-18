import React, { JSX } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../../store'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { clearNoteData, setNoteData, updateNoteData } from '../../../reducers/notebook/note/noteSlice'
import { storeNote, updateNote, viewNote } from '../../../services/NoteService'
import { TNote } from '../../../types'
import { setNotebookData } from '../../../reducers/notebook/notebookSlice'
import { addNotebooksNotebookNote } from '../../../reducers/notebook/notebooksIndexSlice'
import Post from '../../../components/Post/component'
import { TDeityRequest } from '../../../services/DeityService'

const Note = (): JSX.Element => {

  const dispatch = useAppDispatch() // redux

  const { notebookId, noteId } = useParams() as { notebookId: string, noteId: string } // router

  const navigate = useNavigate()

  const { notebook } = useAppSelector((state: RootState) => state.notebook) // redux
  const { note } = useAppSelector((state: RootState) => state.note) // redux

  const isNew: boolean = noteId === 'new'

  const submit = (data: any) => {
    if (isNew) {
      return storeNote(notebookId, data)
        .then(({ data }) => {
          dispatch(setNotebookData({ hasNotes: true }))
          dispatch(addNotebooksNotebookNote({ slug: notebookId, note: data.data }))
          navigate(`/notebooks/${notebookId}/notes/${data.data.slug}`)
          return data.data
        })
    } else {
      return updateNote(noteId, data)
        .then(({ data }) => {
          return data.data
        })
    }
  }

  const readyDataForRequest = (data: any): TDeityRequest => ({
    name: data.name,
    content: data.content,
  })

  return (
    <Post
      key={noteId}
      isNew={isNew}
      pageTypeName={'Note'}
      remoteData={note as TNote}
      onSave={submit}
      onFetch={() => viewNote(noteId).then(({ data }) => data.data)}
      setRemoteData={(data) => dispatch(updateNoteData(data))}
      ready={true}
      fields={[]}
      resetData={() => dispatch(clearNoteData(undefined))}
      requestStructureCallback={readyDataForRequest}
    />
  )
}

export default Note
