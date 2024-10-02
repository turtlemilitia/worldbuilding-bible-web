import { TPlane } from '../../../types'
import { TPlaneRequest } from '../../../services/ApiService/Compendia/PlaneService'
import { useMemo } from 'react'
import { TForm, TUseFormProps } from '../../../components/Post/types'
import { usePostForm } from '../index'
import { usePlaneDataManager } from '../../DataManagers'
import usePlaneFields from '../usePlaneForm/usePlaneFields'
import useLink from '@/hooks/useLink'

type TOwnProps = {
  planeId: TPlane['slug'];
}
const usePlaneForm = ({
  planeId,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TPlane>): TForm<TPlane> => {

  const include = useMemo(() => 'notes', [])

  const manager = usePlaneDataManager()

  const { fields } = usePlaneFields()

  const mapData = (data: any): TPlaneRequest => ({
    name: data.name,
    content: data.content,
  })

  return usePostForm({
    id: planeId,
    mapData,
    include,
    manager,
    fields,

    onFetched,
    onCreated,
    onUpdated,
    onDeleted,
    link: useLink('planes', planeId)
  })
}

export default usePlaneForm
