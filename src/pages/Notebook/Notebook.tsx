import React, { JSX } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { clearNotebookData, setNotebookData, updateNotebookData } from '../../reducers/notebook/notebookSlice'
import {
  destroyNotebook,
  storeNotebook,
  TNotebookRequest,
  updateNotebook,
  viewNotebook
} from '../../services/NotebookService'
import { TNotebook } from '../../types'
import { addNotebook, removeNotebook, updateNotebooksNotebookData } from '../../reducers/notebook/notebooksIndexSlice'
import Post from '../../components/Post/Post'

const Notebook = (): JSX.Element => {

  const dispatch = useAppDispatch() // redux

  const navigate = useNavigate()

  const { notebookId } = useParams() as { notebookId: string } // router

  const { notebook } = useAppSelector((state: RootState) => state.notebook) // redux

  const readyDataForRequest = (data: any): TNotebookRequest => ({
    name: data.name,
    content: data.content,
  })

  return (
    <Post
      key={notebookId}
      isNew={notebookId === 'new'}
      pageTypeName={'Notebook'}
      canEdit={notebook && notebook.canUpdate}
      canDelete={notebook && notebook.canDelete}
      ready={true}

      onFetch={() => viewNotebook(notebookId).then(({ data }) => data.data)}
      onCreate={(data: TNotebook) => storeNotebook(readyDataForRequest(data)).then(({ data }) => data.data)}
      onUpdate={(data: TNotebook) => updateNotebook(notebookId, readyDataForRequest(data)).then(({ data }) => data.data)}
      onDelete={() => destroyNotebook(notebookId)}
      onCreated={(data) => {
        dispatch(addNotebook(data))
        navigate(`/notebooks/${data.slug}`)
      }}
      onUpdated={(data) => {
        dispatch(updateNotebooksNotebookData(data))
      }}
      onDeleted={() => {
        dispatch(removeNotebook({ id: notebookId }))
        navigate(`/`)
      }}

      fields={[]}

      persistedData={notebook as TNotebook}
      setPersistedData={(data) => dispatch(setNotebookData(data))}
      updatePersistedData={(data) => dispatch(updateNotebookData(data))}
      resetPersistedData={() => dispatch(clearNotebookData(undefined))}
    />
  )
}

export default Notebook
