import { TEncounter } from '@/types'
import { createChildApiService } from '../createApiService'
import { createNotableService } from '../createNotableService'
import { createImageableService } from '../createImageableService'
import {
  createCharacterableService
} from '@/services/ApiService/createCharacterableService'
import {
  createLocationableService
} from '@/services/ApiService/createLocationableService'
import {
  createSessionableService
} from '@/services/ApiService/createSessionableService'

export type TEncounterRequest = {
  name: string;
  content: string;
  typeId: number;
  completedAt?: string|null;
}

export type TEncounterResponse = TEncounter

export type TEncounterIndexResponse = TEncounter[];

const EncounterService = {
  ...createChildApiService<TEncounterRequest, TEncounterIndexResponse, TEncounterResponse> ('campaigns', 'encounters'),
  ...createCharacterableService('encounters'),
  ...createLocationableService('encounters'),
  ...createNotableService('encounters'),
  ...createImageableService('encounters'),
  ...createSessionableService('encounters')
}

export default EncounterService