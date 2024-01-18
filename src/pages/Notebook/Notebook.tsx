import React, { JSX, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { clearNotebookData, updateNotebookData } from '../../reducers/notebook/notebookSlice'
import { storeNotebook, updateNotebook, viewNotebook } from '../../services/NotebookService'
import { TNotebook } from '../../types'
import { addNotebook, updateNotebooksNotebookData } from '../../reducers/notebook/notebooksIndexSlice'
import Post from '../../components/Post/component'
import { TDeityRequest } from '../../services/DeityService'

const Notebook = (): JSX.Element => {

  const dispatch = useAppDispatch() // redux

  const { notebookId } = useParams() as { notebookId: string } // router

  const navigate = useNavigate()

  const { notebook } = useAppSelector((state: RootState) => state.notebook) // redux

  const isNew: boolean = notebookId === 'new'

  const submit = useCallback((data: TNotebook) => {
    if (isNew) {
      return storeNotebook(data)
        .then(({ data }) => {
          dispatch(addNotebook(data.data))
          navigate(`/notebooks/${data.data.slug}`)
          return data.data
        })
    } else {
      return updateNotebook(notebookId, data)
        .then(({ data }) => {
          dispatch(updateNotebooksNotebookData(data.data))
          return data.data
        })
    }
  }, [dispatch, navigate])

  const readyDataForRequest = (data: any): TDeityRequest => ({
    name: data.name,
    content: data.content,
  })

  return (
    <Post
      key={notebookId}
      isNew={isNew}
      ready={true}
      remoteData={notebook as TNotebook}
      onSave={submit}
      onFetch={() => viewNotebook(notebookId).then(({data}) => data.data)}
      fields={[]}
      resetData={() => dispatch(clearNotebookData(undefined))}
      setRemoteData={(data) => dispatch(updateNotebookData(data))}
      requestStructureCallback={readyDataForRequest}
    />
  )
}

export default Notebook
