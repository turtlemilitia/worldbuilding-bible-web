import { TLanguage } from '../../types'
import { createAttachableService, TAttachableApi } from './createAttachableService'

export interface TLanguageAttachRequest {
  languageId: number | string,
}

export type TLanguageAttachResponse = TLanguage

export type TLanguageableApi = { languages: TAttachableApi<TLanguageAttachRequest, TLanguageAttachResponse> }

export const createLanguageableService = (parentPluralName: string): TLanguageableApi => ({
  languages: createAttachableService<TLanguageAttachRequest, TLanguageAttachResponse>('language', parentPluralName, 'languages')
})