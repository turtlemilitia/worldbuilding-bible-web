import {TCompendium, TItem} from '../../types'
import {
  destroyItem,
  storeItem,
  TItemRequest, updateItem,
  viewItem
} from '../../services/ItemService'
import useFormHandling from '../useFormHandling'
import { useMemo } from 'react'
import { TUseForm, TUseFormProps } from '../../components/Post/types'

type TOwnProps = {
  compendiumId: TCompendium['slug'];
  itemId: TItem['slug'];
}
const useItemForm = ({
  compendiumId,
  itemId,
  isNew,
  persistedData,
  setPersistedData,
  updatePersistedData,
  resetPersistedData,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TItem>): TUseForm<TItem> => {

  const include = useMemo(() => '', [])

  const mapData = (data: any): TItemRequest => ({
    name: data.name,
    content: data.content,
  })

  const onFetch = () => viewItem(itemId, { include: `${include};notes;images` }).then(({ data }) => data.data)

  const onCreate = (data: TItem): Promise<TItem> => storeItem(compendiumId, mapData(data), { include }).then((response) => response.data.data)

  const onUpdate = (data: TItemRequest) => updateItem(itemId, mapData(data)).then(({data}) => data.data)

  const onDelete = () => destroyItem(itemId);

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

export default useItemForm;
