import { useDataManager, TDataManager } from '../useDataManager'
import { notebookSlice } from '../../../reducers/notebook/notebookSlice'
import { notebooksIndexSlice } from '../../../reducers/notebook/notebooksIndexSlice'
import notebookService, { TNotebookRequest } from '../../../services/ApiService/Notebooks/NotebookService'
import { TNotebook } from '../../../types'
import { useImageableDataManager, hasImageableDataManager } from '../useImageableDataManager'

type TNotebookDataManager = TDataManager<TNotebook, TNotebookRequest> & {
  notebook?: TNotebook
} & hasImageableDataManager
const useNotebookDataManager = (): TNotebookDataManager => {
  const manager = useDataManager(
    'notebook',
    notebookSlice,
    notebooksIndexSlice,
    notebookService
  )
  return {
    isPermanent: true,
    ...manager,
    notebook: manager.entity,
    images: useImageableDataManager(notebookSlice, notebookService.images)
  }
}

export default useNotebookDataManager