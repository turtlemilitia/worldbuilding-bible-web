import { TPantheon } from '../../../types'
import { TPantheonRequest } from '../../../services/ApiService/Compendia/PantheonService'
import { useMemo } from 'react'
import { TForm, TUseFormProps } from '../../../components/Post/types'
import { usePostForm } from '../index'
import { usePantheonDataManager } from '../../DataManagers'
import usePantheonFields from '../usePantheonForm/usePantheonFields'

type TOwnProps = {
  pantheonId: TPantheon['slug'];
}
const usePantheonForm = ({
  pantheonId,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TPantheon>): TForm<TPantheon> => {

  const include = useMemo(() => 'notes', [])

  const manager = usePantheonDataManager()

  const { fields } = usePantheonFields()

  const mapData = (data: any): TPantheonRequest => ({
    name: data.name,
    content: data.content,
  })

  return usePostForm({
    id: pantheonId,
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

export default usePantheonForm
