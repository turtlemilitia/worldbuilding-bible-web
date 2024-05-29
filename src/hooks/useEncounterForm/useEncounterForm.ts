import {TCampaign, TEncounter} from '../../types'
import {
  destroyEncounter,
  storeEncounter,
  TEncounterRequest, updateEncounter,
  viewEncounter
} from '../../services/EncounterService'
import useFormHandling from '../useFormHandling'
import { useMemo } from 'react'
import { TUseForm, TUseFormProps } from '../../components/Post/types'

type TOwnProps = {
  campaignId: TCampaign['slug'];
  encounterId: TEncounter['slug'];
}
const useEncounterForm = ({
  campaignId,
  encounterId,
  isNew,
  persistedData,
  setPersistedData,
  updatePersistedData,
  resetPersistedData,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TEncounter>): TUseForm<TEncounter> => {

  const include = useMemo(() => '', [])

  const mapData = (data: any): TEncounterRequest => ({
    name: data.name,
    content: data.content,
    typeId: data.type.id,
  })

  const onFetch = () => viewEncounter(encounterId, { include: `${include ? `${include};` : ''}images` }).then(({ data }) => data.data)

  const onCreate = (data: TEncounter): Promise<TEncounter> => storeEncounter(campaignId, mapData(data), { include }).then((response) => response.data.data)

  const onUpdate = (data: TEncounterRequest) => updateEncounter(encounterId, mapData(data)).then(({data}) => data.data)

  const onDelete = () => destroyEncounter(encounterId);

  return useFormHandling({
    id: encounterId,
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

export default useEncounterForm;
