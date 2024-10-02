import { TItem } from '@/types'
import { TItemRequest } from '@/services/ApiService/Compendia/ItemService'
import { useMemo } from 'react'
import { TForm, TUseFormProps } from '@/components/Post/types'
import { usePostForm } from '../index'
import { useConceptDataManager } from '../../DataManagers'
import useConceptFields from '../useConceptForm/useConceptFields'
import useLink from '@/hooks/useLink'

type TOwnProps = {
  itemId: TItem['slug'];
}
const useItemForm = ({
  itemId,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TItem>): TForm<TItem> => {

  const include = useMemo(() => 'notes;encounters;quests', [])

  const manager = useConceptDataManager()

  const { fields } = useConceptFields()

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
