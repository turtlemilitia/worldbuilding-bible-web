import { TCompendium, TNaturalResource } from '../../../types'
import { TNaturalResourceRequest } from '../../../services/ApiService/Compendia/NaturalResourceService'
import { useMemo } from 'react'
import { TForm, TUseFormProps } from '../../../components/Post/types'
import { usePostForm } from '../index'
import { useNaturalResourceDataManager } from '../../DataManagers'
import useNaturalResourceFields from '../useNaturalResourceForm/useNaturalResourceFields'
import useLink from '@/hooks/useLink'

type TOwnProps = {
  compendiumId?: TCompendium['id'];
  naturalResourceId?: TNaturalResource['id'];
}
const useNaturalResourceForm = ({
  compendiumId,
  naturalResourceId,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TNaturalResource>): TForm<TNaturalResource> => {

  const include = useMemo(() => 'notes;quests', [])

  const manager = useNaturalResourceDataManager()

  const { fields } = useNaturalResourceFields(manager)

  const mapData = (data: any): TNaturalResourceRequest => ({
    name: data.name,
    content: data.content,
  })

  return usePostForm({
    id: naturalResourceId,
    mapData,
    include,
    manager,
    fields,

    onFetched,
    onCreated,
    onUpdated,
    onDeleted,
    link: naturalResourceId ? useLink('natural-resources', naturalResourceId) : ''
  })
}

export default useNaturalResourceForm
