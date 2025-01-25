import { useMemo } from 'react'
import { TForm, TUseFormProps } from '../../../components/Post/types'
import { usePostForm } from '../index'
import useSystemFields from '../useSystemForm/useSystemFields'
import { TSystem } from '../../../types'
import useSystemDataManager from '../../DataManagers/Systems/useSystemDataManager'
import { TSystemRequest } from '../../../services/ApiService/Systems/SystemService'
import useLink from '@/hooks/useLink'

type TOwnProps = {
  systemId: TSystem['id'];
}
const useSystemForm = ({
  systemId,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TSystem>): TForm<TSystem> => {

  const include = useMemo(() => '', [])

  const manager = useSystemDataManager(systemId)

  const { fields } = useSystemFields(manager)

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
    onDeleted,
    link: useLink('systems', systemId)
  })
}

export default useSystemForm;
