import { TEncounter } from '../../../types'
import { TEncounterRequest } from '../../../services/ApiService/Campaigns/EncounterService'
import { useCallback, useMemo } from 'react'
import { TForm, TUseFormProps } from '../../../components/Post/types'
import usePostForm from '../usePostForm'
import { useEncounterDataManager } from '../../DataManagers'
import useEncounterFields from './useEncounterFields'

type TOwnProps = {
  encounterId: TEncounter['slug'];
}
const useEncounterForm = ({ encounterId, onFetched, onCreated, onUpdated, onDeleted }: TOwnProps & TUseFormProps<TEncounter>): TForm<TEncounter> => {

  const include = useMemo(() => 'type;parent', [])

  const manager = useEncounterDataManager();

  const { fields } = useEncounterFields();

  const mapData = useCallback((data: any): TEncounterRequest => ({
    name: data.name,
    content: data.content,
    typeId: data.type.id,
  }), [])

  return usePostForm<TEncounter, TEncounterRequest>({
    id: encounterId,
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

export default useEncounterForm;
