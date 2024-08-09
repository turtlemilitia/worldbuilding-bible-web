import { TNaturalResource } from '../../../types'
import { TNaturalResourceRequest } from '../../../services/ApiService/Compendia/NaturalResourceService'
import { useMemo } from 'react'
import { TForm, TUseFormProps } from '../../../components/Post/types'
import { usePostForm } from '../index'
import { useNaturalResourceDataManager } from '../../DataManagers'
import useNaturalResourceFields from '../useNaturalResourceForm/useNaturalResourceFields'

type TOwnProps = {
  naturalResourceId: TNaturalResource['slug'];
}
const useNaturalResourceForm = ({
  naturalResourceId,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TNaturalResource>): TForm<TNaturalResource> => {

  const include = useMemo(() => '', [])

  const manager = useNaturalResourceDataManager()

  const { fields } = useNaturalResourceFields()

  const mapData = (data: any): TNaturalResourceRequest => ({
    name: data.name,
    content: data.content,
  })

  return usePostForm({
    id: naturalResourceId,
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

export default useNaturalResourceForm
