import {TCompendium, TDeity} from '../../types'
import {
  destroyDeity,
  storeDeity,
  TDeityRequest, updateDeity,
  viewDeity
} from '../../services/DeityService'
import useFormHandling from '../useFormHandling'
import { useMemo } from 'react'
import { TUseForm, TUseFormProps } from '../../components/Post/types'

type TOwnProps = {
  compendiumId: TCompendium['slug'];
  deityId: TDeity['slug'];
}
const useDeityForm = ({
  compendiumId,
  deityId,
  isNew,
  persistedData,
  setPersistedData,
  updatePersistedData,
  resetPersistedData,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TDeity>): TUseForm<TDeity> => {

  const include = useMemo(() => '', [])

  const mapData = (data: any): TDeityRequest => ({
    name: data.name,
    content: data.content,
  })

  const onFetch = () => viewDeity(deityId, { include: `${include};notes;images` }).then(({ data }) => data.data)

  const onCreate = (data: TDeity): Promise<TDeity> => storeDeity(compendiumId, mapData(data), { include }).then((response) => response.data.data)

  const onUpdate = (data: TDeityRequest) => updateDeity(deityId, mapData(data)).then(({data}) => data.data)

  const onDelete = () => destroyDeity(deityId);

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

export default useDeityForm;
