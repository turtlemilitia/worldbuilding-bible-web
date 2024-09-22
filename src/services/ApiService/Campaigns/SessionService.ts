import { TSession } from '../../../types'
import { createChildApiService } from '../createApiService'
import { createNotableService } from '../createNotableService'
import { createImageableService } from '../createImageableService'
import {createSceneableService} from "../createSceneableService";
import {createEncounterableService} from "../createEncounterableService";
import {createQuestableService} from "../createQuestableService";

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
  ...createSceneableService('sessions'),
  ...createEncounterableService('sessions'),
  ...createQuestableService('sessions'),
  ...createImageableService('sessions')
}

export default SessionService