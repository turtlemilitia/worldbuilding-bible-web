import {TCompendium, TConcept} from '../../types'
import {
  destroyConcept,
  storeConcept,
  TConceptRequest,
  viewConcept
} from '../../services/ConceptService'
import useFormHandling from '../useFormHandling'
import { useMemo } from 'react'
import { TUseForm, TUseFormProps } from '../../components/Post/types'
import { TCompendiumRequest, updateCompendium } from '../../services/CompendiumService'

type TOwnProps = {
  compendiumId: TCompendium['slug'];
  conceptId: TConcept['slug'];
}
const useConceptForm = ({
  compendiumId,
  conceptId,
  isNew,
  persistedData,
  setPersistedData,
  updatePersistedData,
  resetPersistedData,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TConcept>): TUseForm<TConcept> => {

  const include = useMemo(() => 'species;languages;factions', [])

  const mapData = (data: any): TConceptRequest => ({
    name: data.name,
    content: data.content,
  })

  const onFetch = () => viewConcept(conceptId, { include: `${include};notes;images` }).then(({ data }) => data.data)

  const onCreate = (data: TConcept): Promise<TConcept> => storeConcept(compendiumId, mapData(data), { include }).then((response) => response.data.data)

  const onUpdate = (data: TCompendiumRequest) => updateCompendium(compendiumId, mapData(data)).then(({data}) => data.data)

  const onDelete = () => destroyConcept(conceptId);

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

export default useConceptForm;
