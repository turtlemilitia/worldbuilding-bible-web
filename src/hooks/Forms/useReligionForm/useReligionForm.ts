import { TCompendium, TReligion } from '../../../types'
import { TReligionRequest } from '../../../services/ApiService/Compendia/ReligionService'
import { useMemo } from 'react'
import { TForm, TUseFormProps } from '../../../components/Post/types'
import { usePostForm } from '../index'
import { useReligionDataManager } from '../../DataManagers'
import useReligionFields from '../useReligionForm/useReligionFields'
import useLink from '@/hooks/useLink'

type TOwnProps = {
  compendiumId?: TCompendium['id'];
  religionId?: TReligion['id'];
}
const useReligionForm = ({
  compendiumId,
  religionId,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TReligion>): TForm<TReligion> => {

  const include = useMemo(() => 'notes', [])

  const manager = useReligionDataManager(compendiumId, religionId)

  const { fields } = useReligionFields(manager)

  const mapData = (data: any): TReligionRequest => ({
    name: data.name,
    content: data.content,
  })

  return usePostForm({
    id: religionId,
    mapData,
    include,
    manager,
    fields,

    onFetched,
    onCreated,
    onUpdated,
    onDeleted,
    link: useLink('religions', religionId)
  })
}

export default useReligionForm
