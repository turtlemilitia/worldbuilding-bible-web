import { TFaction } from '../../../types'
import { TFactionRequest } from '../../../services/ApiService/Compendia/FactionService'
import { useMemo } from 'react'
import { TForm, TUseFormProps } from '../../../components/Post/types'
import { usePostForm } from '../index'
import { useFactionDataManager } from '../../DataManagers'
import useFactionFields from '../useFactionForm/useFactionFields'

type TOwnProps = {
  factionId: TFaction['slug'];
}
const useFactionForm = ({
  factionId,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TFaction>): TForm<TFaction> => {

  const include = useMemo(() => '', [])

  const manager = useFactionDataManager()

  const { fields } = useFactionFields()

  const mapData = (data: any): TFactionRequest => ({
    name: data.name,
    content: data.content,
  })

  return usePostForm({
    id: factionId,
    mapData,
    include,
    manager,
    fields,

    onFetched,
    onCreated,
    onUpdated,
    onDeleted
  })
}

export default useFactionForm
