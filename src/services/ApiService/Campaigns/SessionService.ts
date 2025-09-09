import { TSession } from '../../../types'
import { createChildApiService } from '../createApiService'
import { createNotableService } from '../createNotableService'
import { createImageableService } from '../createImageableService'
import {createSceneableService} from "../createSceneableService";
import {createEncounterableService} from "../createEncounterableService";
import {createQuestableService} from "../createQuestableService";
import {
  createLocationableService
} from '@/services/ApiService/createLocationableService'
import {
  createCharacterableService
} from '@/services/ApiService/createCharacterableService'
import {
  createMarkdownService
} from '@/services/ApiService/createMarkdownService'

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
  ...createLocationableService('sessions'),
  ...createCharacterableService('sessions'),
  ...createImageableService('sessions'),
  ...createMarkdownService('sessions')
}

export default SessionService