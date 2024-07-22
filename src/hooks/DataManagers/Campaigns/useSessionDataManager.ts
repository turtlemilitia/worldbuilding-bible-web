import { createChildDataManager } from '../createChildDataManager'
import { useMemo } from 'react'
import { sessionSlice } from '../../../reducers/campaign/session/sessionSlice'
import { campaignSlice } from '../../../reducers/campaign/campaignSlice'
import sessionService from '../../../services/ApiService/Campaigns/SessionService'
import { createAttachableDataManager } from '../createAttachableDataManager'
import { createImageableDataManager } from '../createImageableDataManager'

const useSessionDataManager = () => {
  const manager = useMemo(() => createChildDataManager(
    'session',
    'campaign',
    sessionSlice,
    campaignSlice,
    sessionService,
  ), [])
  return {
    ...manager,
    session: manager.entity,
    notes: useMemo(() => createAttachableDataManager('notes', sessionSlice, sessionService.notes), []),
    images: useMemo(() => createImageableDataManager(sessionSlice, sessionService.images), [])
  }
}

export default useSessionDataManager;