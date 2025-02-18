import { TCompendium, TPantheon } from '@/types'
import { TPantheonRequest } from '@/services/ApiService/Compendia/PantheonService'
import { useMemo } from 'react'
import { TForm, TUseFormProps } from '@/components/Post/types'
import { usePostForm } from '../index'
import { usePantheonDataManager } from '../../DataManagers'
import usePantheonFields from '../usePantheonForm/usePantheonFields'
import useLink from '@/hooks/useLink'

type TOwnProps = {
  compendiumId?: TCompendium['id'];
  pantheonId?: TPantheon['id'];
}
const usePantheonForm = ({
  compendiumId,
  pantheonId,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TPantheon>): TForm<TPantheon> => {

  const include = useMemo(() => 'religion:id,slug,name;notes', [])

  const manager = usePantheonDataManager(compendiumId, pantheonId)

  const { fields } = usePantheonFields(manager)

  const mapData = (data: TPantheon): TPantheonRequest => ({
    name: data.name,
    content: data.content,
    religionId: data.religion?.id
  })

  return usePostForm({
    id: pantheonId,
    mapData,
    include,
    manager,
    fields,

    onFetched,
    onCreated,
    onUpdated,
    onDeleted,
    link: useLink('pantheons', pantheonId)
  })
}

export default usePantheonForm
