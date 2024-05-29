import {TCompendium, TLocation} from '../../types'
import {
  destroyLocation,
  storeLocation,
  TLocationRequest, updateLocation,
  viewLocation
} from '../../services/LocationService'
import useFormHandling from '../useFormHandling'
import { useMemo } from 'react'
import { TUseForm, TUseFormProps } from '../../components/Post/types'

type TOwnProps = {
  compendiumId: TCompendium['slug'];
  locationId: TLocation['slug'];
}
const useLocationForm = ({
  compendiumId,
  locationId,
  isNew,
  persistedData,
  setPersistedData,
  updatePersistedData,
  resetPersistedData,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TLocation>): TUseForm<TLocation> => {

  const include = useMemo(() => 'parent;type;governmentType', [])

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

  const onFetch = () => viewLocation(locationId, { include: `${include ? `${include};` : ''}notes;images` }).then(({ data }) => data.data)

  const onCreate = (data: TLocation): Promise<TLocation> => storeLocation(compendiumId, mapData(data), { include }).then((response) => response.data.data)

  const onUpdate = (data: TLocationRequest) => updateLocation(locationId, mapData(data), { include }).then(({data}) => data.data)

  const onDelete = () => destroyLocation(locationId);

  return useFormHandling({
    id: locationId,
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

export default useLocationForm;
