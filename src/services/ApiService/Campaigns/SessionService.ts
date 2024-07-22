import { TSession } from '../../../types'
import { createChildApiService } from '../createApiService'
import { createNotableService } from '../createNotableService'
import { createImageableService } from '../createImageableService'

export interface TSessionRequest {
  name: string;
  content: string;
  scheduled_at: string;
  session_number: string;
  duration?: number
  location?: string
}

type TSessionResponse = TSession;

type TSessionIndexResponse = TSession[];

const SessionService = {
  ...createChildApiService<TSessionRequest, TSessionIndexResponse, TSessionResponse>('campaigns', 'sessions'),
  ...createNotableService('sessions'),
  ...createImageableService('sessions')
}

export default SessionService