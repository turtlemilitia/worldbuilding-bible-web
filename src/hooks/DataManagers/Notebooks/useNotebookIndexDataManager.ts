import { TNotebook, TOptionList } from '../../../types'
import NotebookService from '../../../services/ApiService/Notebooks/NotebookService'
import { notebooksIndexSlice } from '../../../reducers/notebook/notebooksIndexSlice'
import { createIndexDataManager, TIndexDataManager } from '../createIndexDataManager'

type TNotebookIndexDataManager = TIndexDataManager<TNotebook> & {
  notebooks?: TNotebook[]
}

const useNotebookIndexDataManager = (): TNotebookIndexDataManager => {
  const manager = createIndexDataManager(
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