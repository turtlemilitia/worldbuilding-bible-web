import React, { JSX, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../../store'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { clearNoteData, setNoteData, updateNoteData } from '../../../reducers/notebook/note/noteSlice'
import PageTitleField from '../../../components/Forms/Fields/PageTitleField'
import Editor from '../../../components/Forms/Fields/Editor'
import HeaderWrapper from '../../../components/HeaderWrapper'
import ContentWrapper from '../../../components/ContentWrapper'
import { storeNote, updateNote, viewNote } from '../../../services/NoteService'
import { TNote } from '../../../types'
import { AxiosError } from 'axios'
import LoadingWrapper from '../../../components/LoadingWrapper'
import FormToolbar from '../../../components/Forms/FormToolbar'
import ErrorBanner from '../../../components/Banners/ErrorBanner'
import { setNotebookData } from '../../../reducers/notebook/notebookSlice'
import { addNotebooksNotebookNote } from '../../../reducers/notebook/notebooksIndexSlice'

const Note = (): JSX.Element => {

  const dispatch = useAppDispatch() // redux

  const { notebookId, noteId } = useParams() as { notebookId: string, noteId: string } // router

  const navigate = useNavigate()

  const initialState: TNote = {
    name: '',
    content: ''
  }

  const { note } = useAppSelector((state: RootState) => state.note) // redux

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<TNote>(initialState)
  const [error, setError] = useState<string>()

  const isNew: boolean = noteId === 'new'

  const fetch = () => {
    setLoading(true)
    viewNote(noteId)
      .then(response => {
        setLoading(false)
        setData(response.data.data)
        dispatch(setNoteData(response.data.data))
      })
      .catch(err => {
        setError(err)
      })
  }

  useEffect(() => {
    if (noteId && !isNew) {
      fetch()
    }
    if (isNew) {
      setData(initialState)
      dispatch(clearNoteData(undefined))
    }
    return () => {
      dispatch(clearNoteData(undefined))
    }
  }, [noteId])

  const submit = (event: React.SyntheticEvent) => {
    setLoading(true)
    if (isNew) {
      storeNote(notebookId, data)
        .then(({ data }) => {
          setLoading(false)
          setData(data.data)
          dispatch(setNoteData(data.data))
          dispatch(setNotebookData({ hasNotes: true }))
          dispatch(addNotebooksNotebookNote({ slug: notebookId, note: data.data }))
          navigate(`/notebooks/${notebookId}/notes/${data.data.slug}`)
        })
        .catch((err: AxiosError) => {
          setError(err.message)
          setLoading(false)
        })
    } else {
      updateNote(noteId, data)
        .then(({ data }) => {
          setLoading(false)
          setData(data.data)
          dispatch(updateNoteData(data.data))
        })
        .catch((err: AxiosError) => {
          setError(err.message)
          setLoading(false)
        })
    }

    event.preventDefault()
  }

  return (
    <LoadingWrapper loading={loading}>
      <form onSubmit={submit}>
        <HeaderWrapper page="Note">
          <PageTitleField value={data.name}
                          onChange={(value) => setData((prevState: TNote) => ({ ...prevState, name: value }))}
                          placeholder={'Note Name Here'}/>
        </HeaderWrapper>
        <ContentWrapper>
          <div className="flex justify-center -mx-2">
            <div className="w-full md:w-2/4 px-2">
              {error && <ErrorBanner errorText={error}/>}
              <FormToolbar onSave={submit} onRefresh={!isNew ? fetch : undefined}/>
              {!loading && <Editor
                value={data.content}
                onChange={(value) => setData((prevState: TNote) => ({ ...prevState, content: value }))}
                placeholder={'Write a simple description for the note.'}
              />}
            </div>
          </div>
        </ContentWrapper>
      </form>
    </LoadingWrapper>
  )
}

export default Note
