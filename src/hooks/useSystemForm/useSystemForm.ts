import {TCompendium, TSystem} from '../../types'
import {
  destroySystem,
  storeSystem,
  TSystemRequest, updateSystem,
  viewSystem
} from '../../services/SystemService'
import useFormHandling from '../useFormHandling'
import { useMemo } from 'react'
import { TUseForm, TUseFormProps } from '../../components/Post/types'

type TOwnProps = {
  systemId: TSystem['slug'];
}
const useSystemForm = ({
  systemId,
  isNew,
  persistedData,
  setPersistedData,
  updatePersistedData,
  resetPersistedData,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TSystem>): TUseForm<TSystem> => {

  const include = useMemo(() => '', [])

  const mapData = (data: any): TSystemRequest => ({
    name: data.name,
    content: data.content,
  })

  const onFetch = () => viewSystem(systemId, { include: `${include};images` }).then(({ data }) => data.data)

  const onCreate = (data: TSystem): Promise<TSystem> => storeSystem(mapData(data), { include }).then((response) => response.data.data)

  const onUpdate = (data: TSystemRequest) => updateSystem(systemId, mapData(data)).then(({data}) => data.data)

  const onDelete = () => destroySystem(systemId);

  return useFormHandling({
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

export default useSystemForm;
