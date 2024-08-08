import { TNotebook} from '../../../types'
import { TNotebookRequest } from '../../../services/ApiService/Notebooks/NotebookService'
import { useCallback, useMemo } from 'react'
import { TForm, TUseFormProps } from '../../../components/Post/types'
import usePostForm from '../usePostForm'
import { useNotebookDataManager } from '../../DataManagers'
import useNotebookFields from './useNotebookFields'

type TOwnProps = {
  notebookId: TNotebook['slug'];
}
const useNotebookForm = ({
  notebookId,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TNotebook>): TForm<TNotebook> => {

  const include = useMemo(() => 'notes', [])

  const manager = useNotebookDataManager()

  const { fields } = useNotebookFields();

  const mapData = useCallback((data: any): TNotebookRequest => ({
    name: data.name,
    content: data.content,
  }), [])

  return usePostForm<TNotebook, TNotebookRequest>({
    id: notebookId,
    mapData,
    include,
    manager,
    fields,

    onFetched,
    onCreated,
    onUpdated,
    onDeleted
  })
}

export default useNotebookForm;
