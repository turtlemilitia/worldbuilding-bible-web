import {TCompendium, TFaction} from '../../types'
import {
  destroyFaction,
  storeFaction,
  TFactionRequest, updateFaction,
  viewFaction
} from '../../services/FactionService'
import useFormHandling from '../useFormHandling'
import { useMemo } from 'react'
import { TUseForm, TUseFormProps } from '../../components/Post/types'

type TOwnProps = {
  compendiumId: TCompendium['slug'];
  factionId: TFaction['slug'];
}
const useFactionForm = ({
  compendiumId,
  factionId,
  isNew,
  persistedData,
  setPersistedData,
  updatePersistedData,
  resetPersistedData,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TFaction>): TUseForm<TFaction> => {

  const include = useMemo(() => '', [])

  const mapData = (data: any): TFactionRequest => ({
    name: data.name,
    content: data.content,
  })

  const onFetch = () => viewFaction(factionId, { include: `${include ? `${include};` : ''}notes;images` }).then(({ data }) => data.data)

  const onCreate = (data: TFaction): Promise<TFaction> => storeFaction(compendiumId, mapData(data), { include }).then((response) => response.data.data)

  const onUpdate = (data: TFactionRequest) => updateFaction(factionId, mapData(data)).then(({data}) => data.data)

  const onDelete = () => destroyFaction(factionId);

  return useFormHandling({
    id: factionId,
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

export default useFactionForm;
