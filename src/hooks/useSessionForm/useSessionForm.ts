import {TCampaign, TSession} from '../../types'
import {
  destroySession,
  storeSession,
  TSessionRequest, updateSession,
  viewSession
} from '../../services/SessionService'
import useFormHandling from '../useFormHandling'
import { useMemo } from 'react'
import { TUseForm, TUseFormProps } from '../../components/Post/types'

type TOwnProps = {
  campaignId: TCampaign['slug'];
  sessionId: TSession['slug'];
}
const useSessionForm = ({
  campaignId,
  sessionId,
  isNew,
  persistedData,
  setPersistedData,
  updatePersistedData,
  resetPersistedData,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TSession>): TUseForm<TSession> => {

  const include = useMemo(() => '', [])

  const mapData = (data: any): TSessionRequest => ({
    name: data.name,
    content: data.content,
    session_number: data.session_number,
    scheduled_at: data.scheduled_at,
    duration: data.duration,
    location: data.location,
  })

  const onFetch = () => viewSession(sessionId, { include: `${include};notes;images` }).then(({ data }) => data.data)

  const onCreate = (data: TSession): Promise<TSession> => storeSession(campaignId, mapData(data), { include }).then((response) => response.data.data)

  const onUpdate = (data: TSessionRequest) => updateSession(sessionId, mapData(data)).then(({data}) => data.data)

  const onDelete = () => destroySession(sessionId);

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

export default useSessionForm;
