import { createChildDataManager, TChildDataManager } from '../createChildDataManager'
import { useMemo } from 'react'
import { sessionSlice } from '../../../reducers/campaign/session/sessionSlice'
import { campaignSlice } from '../../../reducers/campaign/campaignSlice'
import sessionService from '../../../services/ApiService/Campaigns/SessionService'
import { createAttachableDataManager, hasNotesAttachableDataManager } from '../createAttachableDataManager'
import { createImageableDataManager, hasImageableDataManager } from '../createImageableDataManager'
import { TCampaign, TSession } from '../../../types'
import { TSessionRequest } from '../../../services/ApiService/Campaigns/SessionService'

type TSessionDataManager = TChildDataManager<TCampaign, TSession, TSessionRequest> & {
  campaign?: TCampaign,
  session?: TSession,
} & hasNotesAttachableDataManager & hasImageableDataManager

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
    campaign: manager.parent,
    notes: useMemo(() => createAttachableDataManager('notes', sessionSlice, sessionService.notes), []),
    images: useMemo(() => createImageableDataManager(sessionSlice, sessionService.images), [])
  }
}

export default useSessionDataManager;