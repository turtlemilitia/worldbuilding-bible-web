import { useChildDataManager, TChildDataManager } from '../useChildDataManager'
import { sessionSlice } from '../../../reducers/campaign/session/sessionSlice'
import { campaignSlice } from '../../../reducers/campaign/campaignSlice'
import sessionService from '../../../services/ApiService/Campaigns/SessionService'
import { useAttachableDataManager, hasNotesAttachableDataManager } from '../useAttachableDataManager'
import { useImageableDataManager, hasImageableDataManager } from '../useImageableDataManager'
import { TCampaign, TSession } from '../../../types'
import { TSessionRequest } from '../../../services/ApiService/Campaigns/SessionService'

type TSessionDataManager = TChildDataManager<TCampaign, TSession, TSessionRequest> & {
  campaign?: TCampaign,
  session?: TSession,
} & hasNotesAttachableDataManager & hasImageableDataManager

const useSessionDataManager = (): TSessionDataManager => {
  const manager = useChildDataManager(
    'session',
    'campaign',
    sessionSlice,
    campaignSlice,
    sessionService,
  )
  return {
    ...manager,
    session: manager.entity,
    campaign: manager.parent,
    notes: useAttachableDataManager('notes', sessionSlice, sessionService.notes),
    images: useImageableDataManager(sessionSlice, sessionService.images)
  }
}

export default useSessionDataManager;