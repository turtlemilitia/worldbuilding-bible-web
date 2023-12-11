import React, { JSX, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { clearNotebookData, setNotebookData, updateNotebookData } from '../../reducers/notebook/notebookSlice'
import PageTitleField from '../../components/Forms/Fields/PageTitleField'
import { Editor } from '../../components/Forms/Fields/Editor'
import HeaderWrapper from '../../components/HeaderWrapper'
import ContentWrapper from '../../components/ContentWrapper'
import { storeNotebook, updateNotebook, viewNotebook } from '../../services/NotebookService'
import { TNotebook } from '../../types'
import { AxiosError } from 'axios'
import LoadingWrapper from '../../components/LoadingWrapper'
import { addNotebook } from '../../reducers/notebook/notebooksIndexSlice'
import FormToolbar from '../../components/Forms/FormToolbar'
import ErrorBanner from '../../components/Banners/ErrorBanner'

const Notebook = (): JSX.Element => {

  const dispatch = useAppDispatch() // redux

  const { notebookId } = useParams() as { notebookId: string } // router

  const navigate = useNavigate()

  const initialState: TNotebook = {
    name: '',
    content: '',
    hasNotes: false
  }

  const { notebook } = useAppSelector((state: RootState) => state.notebook) // redux

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<TNotebook>(initialState)
  const [error, setError] = useState<string>()

  const isNew: boolean = notebookId === 'new'

  const fetch = () => {
    setLoading(true)
    viewNotebook(notebookId)
      .then(response => {
        setLoading(false)
        setData(response.data.data)
        dispatch(setNotebookData(response.data.data))
      })
      .catch(err => {
        setError(err)
      })
  }

  useEffect(() => {
    if (notebookId && !isNew) {
      fetch()
    }
    if (isNew) {
      setData(initialState)
      dispatch(clearNotebookData(undefined))
    }
    return () => {
      dispatch(clearNotebookData(undefined))
    }
  }, [notebookId])

  const submit = (event: React.SyntheticEvent) => {
    setLoading(true)
    if (isNew) {
      storeNotebook(data)
        .then(response => {
          setLoading(false)
          setData(response.data.data)
          dispatch(setNotebookData(response.data.data))
          dispatch(addNotebook(response.data.data))
          navigate(`/notebooks/${response.data.data.slug}`)
        })
        .catch((err: AxiosError) => {
          setError(err.message)
        })
    } else {
      updateNotebook(notebookId, data)
        .then(response => {
          setLoading(false)
          setData(response.data.data)
          dispatch(updateNotebookData(response.data.data))
        })
        .catch((err: AxiosError) => {
          setError(err.message)
        })
    }

    event.preventDefault()
  }

  return (
    <LoadingWrapper loading={loading}>
      <form onSubmit={submit}>
        <HeaderWrapper page="Notebook">
          <PageTitleField value={data.name}
                          onChange={(value) => setData((prevState: TNotebook) => ({ ...prevState, name: value }))}
                          placeholder={'Notebook Name Here'}/>
        </HeaderWrapper>
        <ContentWrapper>
          <div className="flex justify-center -mx-2">
            <div className="w-full md:w-2/4 max-w-2xl px-2">
              {error && <ErrorBanner errorText={error}/>}
              <FormToolbar onSave={submit} onRefresh={fetch}/>
              {!loading && <Editor
                value={data.content}
                onChange={(value) => setData((prevState: TNotebook) => ({ ...prevState, content: value }))}
                placeholder={'Write a simple description for the notebook.'}
              />}
            </div>
          </div>
        </ContentWrapper>
      </form>
    </LoadingWrapper>
  )
}

export default Notebook
