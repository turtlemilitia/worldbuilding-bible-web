import { TForm, TUseFormProps } from '@/components/Post/types'
import { TCompendium, TConcept } from '@/types'
import { useCallback, useMemo } from 'react'
import { TConceptRequest } from '@/services/ApiService/Compendia/ConceptService'
import { usePostForm } from '../index'
import { useConceptDataManager } from '../../DataManagers'
import useConceptFields from './useConceptFields'
import useLink from '@/hooks/useLink'

type TOwnProps = {
  compendiumId?: TCompendium['id'];
  conceptId?: TConcept['id'];
}
const useConceptForm = ({
  compendiumId,
  conceptId,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TConcept>): TForm<TConcept> => {

  const include = useMemo(() => '', [])

  const manager = useConceptDataManager(compendiumId, conceptId)

  const { fields } = useConceptFields(manager)

  const mapData = useCallback((data: any): TConceptRequest => ({
    name: data.name,
    content: data.content,
  }), [])

  return usePostForm({
    id: conceptId,
    mapData,
    include,
    manager,
    fields,
    onFetched,
    onCreated,
    onUpdated,
    onDeleted,
    link: useLink('concepts', conceptId)
  })
}

export default useConceptForm
