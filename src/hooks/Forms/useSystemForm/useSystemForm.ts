import { useMemo } from 'react'
import { TForm, TUseFormProps } from '../../../components/Post/types'
import { usePostForm } from '../index'
import useSystemFields from '../useSystemForm/useSystemFields'
import { TSystem } from '../../../types'
import useSystemDataManager from '../../DataManagers/Systems/useSystemDataManager'
import { TSystemRequest } from '../../../services/ApiService/Systems/SystemService'

type TOwnProps = {
  systemId: TSystem['slug'];
}
const useSystemForm = ({
  systemId,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TSystem>): TForm<TSystem> => {

  const include = useMemo(() => '', [])

  const manager = useSystemDataManager()

  const { fields } = useSystemFields()

  const mapData = (data: any): TSystemRequest => ({
    name: data.name,
    content: data.content,
  })

  return usePostForm({
    id: systemId,
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

export default useSystemForm;
