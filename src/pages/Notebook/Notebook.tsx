import React, { JSX, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { RootState } from '../../store'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { clearNotebookData, setNotebookData, updateNotebookData } from '../../reducers/notebook/notebookSlice'
import { storeNotebook, updateNotebook, viewNotebook } from '../../services/NotebookService'
import { TNotebook } from '../../types'
import { addNotebook, updateNotebooksNotebookData } from '../../reducers/notebook/notebooksIndexSlice'
import Post from '../../components/Post/component'
import { TDeityRequest } from '../../services/DeityService'

const Notebook = (): JSX.Element => {

  const dispatch = useAppDispatch() // redux

  const { notebookId } = useParams() as { notebookId: string } // router

  const { notebook } = useAppSelector((state: RootState) => state.notebook) // redux

  const readyDataForRequest = (data: any): TDeityRequest => ({
    name: data.name,
    content: data.content,
  })

  return (
    <Post
      key={notebookId}
      isNew={notebookId === 'new'}
      pathToNew={(data: TNotebook) => `/notebooks/${data.slug}`}
      ready={true}

      onCreate={(data: TNotebook) => storeNotebook(data).then(({ data }) => data.data)}
      onUpdate={(data: TNotebook) => updateNotebook(notebookId, data).then(({ data }) => data.data)}
      onCreated={(data: TNotebook) => {
        dispatch(addNotebook(data))
      }}
      onUpdated={(data: TNotebook) => {
        dispatch(updateNotebooksNotebookData(data))
      }}
      onFetch={() => viewNotebook(notebookId).then(({ data }) => data.data)}
      requestStructureCallback={readyDataForRequest}

      fields={[]}

      persistedData={notebook as TNotebook}
      setPersistedData={(data) => dispatch(setNotebookData(data))}
      updatePersistedData={(data) => dispatch(updateNotebookData(data))}
      resetPersistedData={() => dispatch(clearNotebookData(undefined))}
    />
  )
}

export default Notebook
