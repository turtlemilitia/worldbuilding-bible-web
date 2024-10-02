import { TReligion } from '../../../types'
import { TReligionRequest } from '../../../services/ApiService/Compendia/ReligionService'
import { useMemo } from 'react'
import { TForm, TUseFormProps } from '../../../components/Post/types'
import { usePostForm } from '../index'
import { useReligionDataManager } from '../../DataManagers'
import useReligionFields from '../useReligionForm/useReligionFields'
import useLink from '@/hooks/useLink'

type TOwnProps = {
  religionId: TReligion['slug'];
}
const useReligionForm = ({
  religionId,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TReligion>): TForm<TReligion> => {

  const include = useMemo(() => 'notes', [])

  const manager = useReligionDataManager()

  const { fields } = useReligionFields()

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
