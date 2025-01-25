import { TCompendium, TPlane } from '../../../types'
import { TPlaneRequest } from '../../../services/ApiService/Compendia/PlaneService'
import { useMemo } from 'react'
import { TForm, TUseFormProps } from '../../../components/Post/types'
import { usePostForm } from '../index'
import { usePlaneDataManager } from '../../DataManagers'
import usePlaneFields from '../usePlaneForm/usePlaneFields'
import useLink from '@/hooks/useLink'

type TOwnProps = {
  compendiumId?: TCompendium['id'];
  planeId?: TPlane['id'];
}
const usePlaneForm = ({
  compendiumId,
  planeId,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TPlane>): TForm<TPlane> => {

  const include = useMemo(() => 'notes', [])

  const manager = usePlaneDataManager(compendiumId, planeId)

  const { fields } = usePlaneFields(manager)

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
    link: planeId ? useLink('planes', planeId) : ''
  })
}

export default usePlaneForm
