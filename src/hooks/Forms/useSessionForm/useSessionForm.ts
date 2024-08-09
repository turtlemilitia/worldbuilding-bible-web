import { TSession } from '../../../types'
import { TSessionRequest } from '../../../services/ApiService/Campaigns/SessionService'
import { useMemo } from 'react'
import { TForm, TUseFormProps } from '../../../components/Post/types'
import { useSessionDataManager } from '../../DataManagers'
import usePostForm from '../usePostForm'
import useSessionFields from './useSessionFields'

type TOwnProps = {
  sessionId: TSession['slug'];
}
const useSessionForm = ({
  sessionId,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TSession>): TForm<TSession> => {

  const include = useMemo(() => '', [])

  const manager = useSessionDataManager()

  const { fields } = useSessionFields()

  const mapData = (data: any): TSessionRequest => ({
    name: data.name,
    content: data.content,
    session_number: data.session_number,
    scheduled_at: data.scheduled_at,
    duration: data.duration,
    location: data.location,
  })

  return usePostForm({
    id: sessionId,
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

export default useSessionForm