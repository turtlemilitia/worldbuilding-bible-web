import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../hooks'
import { RootState } from '../../store'
import { TNotebook } from '../../types'
import { useMemo } from 'react'
import { setNotebookData, updateNotebookData } from '../../reducers/notebook/notebookSlice'
import {
  addNotebook,
  removeNotebook,
  updateNotebooksNotebookData
} from '../../reducers/notebook/notebooksIndexSlice'

const useNotebookPageData = () => {

  const { notebookId } = useParams() as { notebookId: string } // router
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { notebook: persistedData } = useAppSelector((state: RootState) => state.notebook) // redux]

  const isNew: boolean = useMemo(() => notebookId === 'new', [notebookId])
  const canEdit: boolean = useMemo(() => isNew || persistedData?.canUpdate !== undefined, [isNew, persistedData?.canUpdate])

  return {
    isNew,
    canEdit,
    notebookId,
    persistedData,
    setPersistedData: (data?: TNotebook) => dispatch(setNotebookData(data)),
    updatePersistedData: (data: Partial<TNotebook>) => dispatch(updateNotebookData(data)),
    resetPersistedData: () => dispatch(setNotebookData(undefined)),
    onCreated: (data: TNotebook) => {
      dispatch(addNotebook(data))
      navigate(`/notebooks/${data?.slug}`)
    },
    onUpdated: (data: TNotebook) => {
      dispatch(updateNotebooksNotebookData({ field: 'notebooks', data: data }))
    },
    onDeleted: () => {
      dispatch(removeNotebook({ id: notebookId }))
      navigate('/')
    },
  }

}

export default useNotebookPageData
