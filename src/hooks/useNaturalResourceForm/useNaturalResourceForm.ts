import {TCompendium, TNaturalResource} from '../../types'
import {
  destroyNaturalResource,
  storeNaturalResource,
  TNaturalResourceRequest, updateNaturalResource,
  viewNaturalResource
} from '../../services/NaturalResourceService'
import useFormHandling from '../useFormHandling'
import { useMemo } from 'react'
import { TUseForm, TUseFormProps } from '../../components/Post/types'

type TOwnProps = {
  compendiumId: TCompendium['slug'];
  naturalResourceId: TNaturalResource['slug'];
}
const useNaturalResourceForm = ({
  compendiumId,
  naturalResourceId,
  isNew,
  persistedData,
  setPersistedData,
  updatePersistedData,
  resetPersistedData,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TNaturalResource>): TUseForm<TNaturalResource> => {

  const include = useMemo(() => '', [])

  const mapData = (data: any): TNaturalResourceRequest => ({
    name: data.name,
    content: data.content,
  })

  const onFetch = () => viewNaturalResource(naturalResourceId, { include: `${include};notes;images` }).then(({ data }) => data.data)

  const onCreate = (data: TNaturalResource): Promise<TNaturalResource> => storeNaturalResource(compendiumId, mapData(data), { include }).then((response) => response.data.data)

  const onUpdate = (data: TNaturalResourceRequest) => updateNaturalResource(naturalResourceId, mapData(data)).then(({data}) => data.data)

  const onDelete = () => destroyNaturalResource(naturalResourceId);

  return useFormHandling({
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

export default useNaturalResourceForm;
