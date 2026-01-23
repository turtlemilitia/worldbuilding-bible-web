import { TCampaign, TCompendium, TEncounter } from '@/types'
import { TEncounterRequest } from '@/services/ApiService/Campaigns/EncounterService'
import { useCallback, useMemo } from 'react'
import { TForm, TUseFormProps } from '@/components/Post/types'
import usePostForm from '../usePostForm'
import { useEncounterDataManager } from '../../DataManagers'
import useEncounterFields from './useEncounterFields'
import useLink from '@/hooks/useLink'

type TOwnProps = {
  campaignId?: TCampaign['id'];
  encounterId?: TEncounter['id'];
}
const useEncounterForm = ({ campaignId, encounterId, onFetched, onCreated, onUpdated, onDeleted }: TOwnProps & TUseFormProps<TEncounter>): TForm<TEncounter> => {

  const include = useMemo(() => 'type;notes;quests;sessions;locations;characters', [])

  const manager = useEncounterDataManager(campaignId, encounterId);

  const { fields } = useEncounterFields(manager);

  const mapData = useCallback((data: any): TEncounterRequest => ({
    name: data.name,
    content: data.content,
    typeId: data.type?.id,
    completedAt: data.completedAt,
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
    onDeleted,
    link: useLink('encounters', encounterId)
  })
}

export default useEncounterForm;
