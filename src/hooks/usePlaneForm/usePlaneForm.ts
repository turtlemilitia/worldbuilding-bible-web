import {TCompendium, TPlane} from '../../types'
import {
  destroyPlane,
  storePlane,
  TPlaneRequest, updatePlane,
  viewPlane
} from '../../services/PlaneService'
import useFormHandling from '../useFormHandling'
import { useMemo } from 'react'
import { TUseForm, TUseFormProps } from '../../components/Post/types'

type TOwnProps = {
  compendiumId: TCompendium['slug'];
  planeId: TPlane['slug'];
}
const usePlaneForm = ({
  compendiumId,
  planeId,
  isNew,
  persistedData,
  setPersistedData,
  updatePersistedData,
  resetPersistedData,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TPlane>): TUseForm<TPlane> => {

  const include = useMemo(() => '', [])

  const mapData = (data: any): TPlaneRequest => ({
    name: data.name,
    content: data.content,
  })

  const onFetch = () => viewPlane(planeId, { include: `${include ? `${include};` : ''}notes;images` }).then(({ data }) => data.data)

  const onCreate = (data: TPlane): Promise<TPlane> => storePlane(compendiumId, mapData(data), { include }).then((response) => response.data.data)

  const onUpdate = (data: TPlaneRequest) => updatePlane(planeId, mapData(data)).then(({data}) => data.data)

  const onDelete = () => destroyPlane(planeId);

  return useFormHandling({
    id: planeId,
    isNew,
    mapData,

    // API
    onFetch,
    onCreate,
    onUpdate,
    onDelete,
    onFetched,
    onCreated,
    onUpdated,
    onDeleted,

    // persisted data
    persistedData,
    setPersistedData,
    updatePersistedData,
    resetPersistedData
  })
}

export default usePlaneForm;
