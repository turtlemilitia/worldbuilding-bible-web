import { TCompendium, TItem } from '@/types'
import { TItemRequest } from '@/services/ApiService/Compendia/ItemService'
import { useMemo } from 'react'
import { TForm, TUseFormProps } from '@/components/Post/types'
import { usePostForm } from '../index'
import useItemFields from '@/hooks/Forms/useItemForm/useItemFields'
import { useItemDataManager } from '@/hooks/DataManagers'
import useLink from '@/hooks/useLink'

type TOwnProps = {
  compendiumId?: TCompendium['id'];
  itemId?: TItem['id'];
}
const useItemForm = ({
  compendiumId,
  itemId,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TItem>): TForm<TItem> => {

  const include = useMemo(() => 'notes;encounters;quests', [])

  const manager = useItemDataManager(compendiumId, itemId)

  const { fields } = useItemFields(manager)

  const mapData = (data: any): TItemRequest => ({
    name: data.name,
    content: data.content,
  })

  return usePostForm({
    id: itemId,
    mapData,
    include,
    manager,
    fields,

    onFetched,
    onCreated,
    onUpdated,
    onDeleted,
    link: useLink('items', itemId)
  })
}

export default useItemForm
