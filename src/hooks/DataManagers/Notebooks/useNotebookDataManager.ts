import { createDataManager, TUseDataManager } from '../createDataManager'
import { notebookSlice } from '../../../reducers/notebook/notebookSlice'
import { notebooksIndexSlice } from '../../../reducers/notebook/notebooksIndexSlice'
import notebookService, { TNotebookRequest } from '../../../services/ApiService/Notebooks/NotebookService'
import { TNotebook } from '../../../types'
import { createImageableDataManager, hasImageableDataManager } from '../createImageableDataManager'
import { useMemo } from 'react'

type TUseNotebookDataManager = TUseDataManager<TNotebook, TNotebookRequest> & {
  notebook?: TNotebook
} & hasImageableDataManager
const useNotebookDataManager = (): TUseNotebookDataManager => {
  const manager = createDataManager(
    'notebook',
    notebookSlice,
    notebooksIndexSlice,
    notebookService
  )
  return {
    notebook: manager.entity,
    ...manager,
    images: useMemo(() => createImageableDataManager(notebookSlice, notebookService.images), [])
  }
}

export default useNotebookDataManager