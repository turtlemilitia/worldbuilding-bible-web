import { TDeity } from '../../../types'
import { TDeityRequest } from '../../../services/ApiService/Compendia/DeityService'
import { useMemo } from 'react'
import { TForm, TUseFormProps } from '../../../components/Post/types'
import { usePostForm } from '../index'
import { useDeityDataManager } from '../../DataManagers'
import useDeityFields from '../useDeityForm/useDeityFields'

type TOwnProps = {
  deityId: TDeity['slug'];
}
const useDeityForm = ({
  deityId,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TDeity>): TForm<TDeity> => {

  const include = useMemo(() => 'notes', [])

  const manager = useDeityDataManager()

  const { fields } = useDeityFields()

  const mapData = (data: any): TDeityRequest => ({
    name: data.name,
    content: data.content,
  })

  return usePostForm({
    id: deityId,
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

export default useDeityForm
