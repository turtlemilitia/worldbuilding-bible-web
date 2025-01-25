import { TCompendium, TDeity } from '@/types'
import { TDeityRequest } from '@/services/ApiService/Compendia/DeityService'
import { useMemo } from 'react'
import { TForm, TUseFormProps } from '@/components/Post/types'
import { usePostForm } from '../index'
import { useDeityDataManager } from '../../DataManagers'
import useDeityFields from '../useDeityForm/useDeityFields'
import useLink from '@/hooks/useLink'

type TOwnProps = {
  compendiumId?: TCompendium['id'];
  deityId?: TDeity['id'];
}
const useDeityForm = ({
  compendiumId,
  deityId,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TDeity>): TForm<TDeity> => {

  const include = useMemo(() => 'pantheon:id,slug,name;notes', [])

  const manager = useDeityDataManager(compendiumId, deityId)

  const { fields } = useDeityFields(manager)

  const mapData = (data: TDeity): TDeityRequest => ({
    name: data.name,
    content: data.content,
    pantheonId: data.pantheon?.id
  })

  return usePostForm({
    id: deityId,
    mapData,
    include,
    manager,
    fields,

    onFetched,
    onCreated,
    onUpdated,
    onDeleted,
    link: deityId ? useLink('deities', deityId) : ''
  })
}

export default useDeityForm
