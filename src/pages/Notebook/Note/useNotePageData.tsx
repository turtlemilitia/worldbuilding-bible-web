import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../../hooks'
import { RootState } from '../../../store'
import { TNote } from '../../../types'
import { setNoteData, updateNoteData } from '../../../reducers/notebook/note/noteSlice'
import { useMemo } from 'react'
import {
  addNotebooksNotebookNote,
  removeNotebooksNotebookNote,
  updateNotebooksNotebookNote
} from '../../../reducers/notebook/notebooksIndexSlice'

const useNotePageData = () => {

  const { notebookId, noteId } = useParams() as { notebookId: string; noteId: string } // router
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { note: persistedData } = useAppSelector((state: RootState) => state.note) // redux]

  const isNew: boolean = useMemo(() => noteId === 'new', [noteId])
  const canEdit: boolean = useMemo(() => isNew || persistedData?.canUpdate !== undefined, [isNew, persistedData?.canUpdate])

  return {
    isNew,
    canEdit,
    notebookId,
    noteId,
    persistedData,
    setPersistedData: (data?: TNote) => dispatch(setNoteData(data)),
    updatePersistedData: (data: Partial<TNote>) => dispatch(updateNoteData(data)),
    resetPersistedData: () => dispatch(setNoteData(undefined)),
    onCreated: (data: TNote) => {
      dispatch(addNotebooksNotebookNote({ slug: notebookId, note: data }))
      navigate(`/notebooks/${notebookId}/notes/${data?.slug}`)
    },
    onUpdated: (data: TNote) => {
      dispatch(updateNotebooksNotebookNote({ slug: notebookId, note: data }))
    },
    onDeleted: () => {
      dispatch(removeNotebooksNotebookNote({ slug: notebookId, noteId }))
      navigate(`/notebooks/${notebookId}`)
    },
  }

}

export default useNotePageData
