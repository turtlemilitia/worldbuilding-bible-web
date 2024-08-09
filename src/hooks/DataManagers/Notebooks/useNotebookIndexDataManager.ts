import { TNotebook } from '../../../types'
import NotebookService from '../../../services/ApiService/Notebooks/NotebookService'
import { notebooksIndexSlice } from '../../../reducers/notebook/notebooksIndexSlice'
import { useIndexDataManager, TIndexDataManager } from '../useIndexDataManager'

type TNotebookIndexDataManager = TIndexDataManager<TNotebook> & {
  notebooks?: TNotebook[]
}

const useNotebookIndexDataManager = (): TNotebookIndexDataManager => {
  const manager = useIndexDataManager(
    'notebooks',
    notebooksIndexSlice,
    NotebookService,
  )
  return {
    ...manager,
    notebooks: manager.list,
  }
}

export default useNotebookIndexDataManager