import {TCompendium, TSpecies} from '../../types'
import {
  destroySpecies,
  storeSpecies,
  TSpeciesRequest, updateSpecies,
  viewSpecies
} from '../../services/SpeciesService'
import useFormHandling from '../useFormHandling'
import { useMemo } from 'react'
import { TUseForm, TUseFormProps } from '../../components/Post/types'

type TOwnProps = {
  compendiumId: TCompendium['slug'];
  speciesId: TSpecies['slug'];
}
const useSpeciesForm = ({
  compendiumId,
  speciesId,
  isNew,
  persistedData,
  setPersistedData,
  updatePersistedData,
  resetPersistedData,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TSpecies>): TUseForm<TSpecies> => {

  const include = useMemo(() => '', [])

  const mapData = (data: any): TSpeciesRequest => ({
    name: data.name,
    content: data.content,
  })

  const onFetch = () => viewSpecies(speciesId, { include: `${include ? `${include};` : ''}notes;images` }).then(({ data }) => data.data)

  const onCreate = (data: TSpecies): Promise<TSpecies> => storeSpecies(compendiumId, mapData(data), { include }).then((response) => response.data.data)

  const onUpdate = (data: TSpeciesRequest) => updateSpecies(speciesId, mapData(data)).then(({data}) => data.data)

  const onDelete = () => destroySpecies(speciesId);

  return useFormHandling({
    id: speciesId,
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

export default useSpeciesForm;
