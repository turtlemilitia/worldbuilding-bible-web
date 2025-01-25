import { TCompendium, TLocation } from '../../../types'
import { TLocationRequest } from '../../../services/ApiService/Compendia/LocationService'
import { useMemo } from 'react'
import { TForm, TUseFormProps } from '../../../components/Post/types'
import { usePostForm } from '../index'
import { useLocationDataManager } from '../../DataManagers'
import useLocationFields from '../useLocationForm/useLocationFields'
import useLink from '@/hooks/useLink'

type TOwnProps = {
  compendiumId?: TCompendium['id'];
  locationId?: TLocation['id'];
}
const useLocationForm = ({
  compendiumId,
  locationId,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TLocation>): TForm<TLocation> => {

  const include = useMemo(() => 'parent;type;governmentType;children;notes;encounters;quests;scenes;characters', [])

  const manager = useLocationDataManager(compendiumId, locationId)

  const { fields } = useLocationFields(manager)

  const mapData = (data: any): TLocationRequest => ({
    name: data.name,
    content: data.content,
    typeId: data.type?.id,
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
    onDeleted,
    link: locationId ? useLink('locations', locationId) : ''
  })
}

export default useLocationForm
