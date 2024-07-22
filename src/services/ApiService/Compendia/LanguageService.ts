import { AxiosResponse } from 'axios'
import { TLanguage } from '../../../types'
import api from '../../../api'
import { createChildApiService } from '../createApiService'
import { createImageableService } from '../createImageableService'
import { createNotableService } from '../createNotableService'
import { createQuestableService } from '../createQuestableService'
import { createEncounterableService } from '../createEncounterableService'

export interface TLanguageRequest {
  name: string;
  content: string;
}

type TLanguageResponse = TLanguage;

type TLanguageIndexResponse = TLanguage[];

const pluralName = 'languages'

const LanguageService = {
  ...createChildApiService<TLanguageRequest, TLanguageIndexResponse, TLanguageResponse>('compendia', pluralName),
  ...createNotableService(pluralName),
  ...createImageableService(pluralName),
  ...createQuestableService(pluralName),
  ...createEncounterableService(pluralName),
  attachToCharacter: (slug: string, languageId: number): Promise<AxiosResponse<TLanguageResponse>> => {
    return api.post(`/api/characters/${slug}/languages`, { languageId })
  },
  detachFromCharacter: (slug: string, languageSlug: string): Promise<AxiosResponse<{}>> => {
    return api.delete(`/api/characters/${slug}/languages/${languageSlug}`)
  }
}

export default LanguageService