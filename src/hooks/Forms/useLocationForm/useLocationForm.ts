import { TLocation } from '../../../types'
import { TLocationRequest } from '../../../services/ApiService/Compendia/LocationService'
import { useMemo } from 'react'
import { TForm, TUseFormProps } from '../../../components/Post/types'
import { usePostForm } from '../index'
import { useLocationDataManager } from '../../DataManagers'
import useLocationFields from '../useLocationForm/useLocationFields'

type TOwnProps = {
  locationId: TLocation['slug'];
}
const useLocationForm = ({
  locationId,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TLocation>): TForm<TLocation> => {

  const include = useMemo(() => 'parent;type;governmentType;children', [])

  const manager = useLocationDataManager()

  const { fields } = useLocationFields()

  const mapData = (data: any): TLocationRequest => ({
    name: data.name,
    content: data.content,
    typeId: data.type.id,
    aliases: data.aliases,
    demonym: data.demonym,
    population: data.population,
    governmentTypeId: data.governmentType?.id,
    parentId: data.parent?.id,
  })

  return usePostForm({
    id: locationId,
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

export default useLocationForm