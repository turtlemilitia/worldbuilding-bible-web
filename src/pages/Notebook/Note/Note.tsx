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
import useImageSelection from '../../../utils/useImageSelection'

const Note = (): JSX.Element => {

  const dispatch = useAppDispatch() // redux

  const { notebookId, noteId } = useParams() as { notebookId: string, noteId: string } // router

  const navigate = useNavigate()

  const { note } = useAppSelector((state: RootState) => state.note) // redux

  const isNew: boolean = noteId === 'new'

  const fetch = async () => {
    if (noteId && !isNew) {
      await viewNote(noteId)
        .then(response => {
          dispatch(setNoteData(response.data.data))
        })
    }
    if (isNew) {
      reset()
    }
  }

  const submit = (data: any) => {
    if (isNew) {
      return storeNote(notebookId, data)
        .then(({ data }) => {
          dispatch(setNoteData(data.data))
          dispatch(setNotebookData({ hasNotes: true }))
          dispatch(addNotebooksNotebookNote({ slug: notebookId, note: data.data }))
          navigate(`/notebooks/${notebookId}/notes/${data.data.slug}`)
          return data.data
        })
    } else {
      return updateNote(noteId, data)
        .then(({ data }) => {
          dispatch(updateNoteData(data.data))
          return data.data
        })
    }
  }

  const reset = () => dispatch(clearNoteData(undefined))

  return (
    <Post
      key={noteId}
      initialValues={note as TNote}
      onSubmit={submit}
      onFetch={fetch}
      ready={true}
      fields={[]}
      resetData={reset}
    />
  )
}

export default Note
