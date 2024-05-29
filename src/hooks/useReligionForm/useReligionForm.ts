import {TCompendium, TReligion} from '../../types'
import {
  destroyReligion,
  storeReligion,
  TReligionRequest, updateReligion,
  viewReligion
} from '../../services/ReligionService'
import useFormHandling from '../useFormHandling'
import { useMemo } from 'react'
import { TUseForm, TUseFormProps } from '../../components/Post/types'

type TOwnProps = {
  compendiumId: TCompendium['slug'];
  religionId: TReligion['slug'];
}
const useReligionForm = ({
  compendiumId,
  religionId,
  isNew,
  persistedData,
  setPersistedData,
  updatePersistedData,
  resetPersistedData,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TReligion>): TUseForm<TReligion> => {

  const include = useMemo(() => '', [])

  const mapData = (data: any): TReligionRequest => ({
    name: data.name,
    content: data.content,
  })

  const onFetch = () => viewReligion(religionId, { include: `${include ? `${include};` : ''}notes;images` }).then(({ data }) => data.data)

  const onCreate = (data: TReligion): Promise<TReligion> => storeReligion(compendiumId, mapData(data), { include }).then((response) => response.data.data)

  const onUpdate = (data: TReligionRequest) => updateReligion(religionId, mapData(data)).then(({data}) => data.data)

  const onDelete = () => destroyReligion(religionId);

  return useFormHandling({
    id: religionId,
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

export default useReligionForm;
