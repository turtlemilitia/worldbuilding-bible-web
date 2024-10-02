import { TSpecies } from '../../../types'
import { TSpeciesRequest } from '../../../services/ApiService/Compendia/SpeciesService'
import { useMemo } from 'react'
import { TForm, TUseFormProps } from '../../../components/Post/types'
import { usePostForm } from '../index'
import { useSpeciesDataManager } from '../../DataManagers'
import useSpeciesFields from '../useSpeciesForm/useSpeciesFields'
import useLink from '@/hooks/useLink'

type TOwnProps = {
  speciesId: TSpecies['slug'];
}
const useSpeciesForm = ({
  speciesId,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TSpecies>): TForm<TSpecies> => {

  const include = useMemo(() => 'notes', [])

  const manager = useSpeciesDataManager()

  const { fields } = useSpeciesFields()

  const mapData = (data: any): TSpeciesRequest => ({
    name: data.name,
    content: data.content,
  })

  return usePostForm({
    id: speciesId,
    mapData,
    include,
    manager,
    fields,

    onFetched,
    onCreated,
    onUpdated,
    onDeleted,
    link: useLink('species', speciesId)
  })
}

export default useSpeciesForm
