import { TCharacter } from '../../types'
import { createAttachableService, TAttachableApi } from './createAttachableService'

export interface TCharacterAttachRequest {
  characterId: number | string,
}

export type TCharacterAttachResponse = TCharacter

export type TCharacterableApi = { characters: TAttachableApi<TCharacterAttachRequest, TCharacterAttachResponse> }

export const createCharacterableService = (parentPluralName: string): TCharacterableApi => ({
  characters: createAttachableService<TCharacterAttachRequest, TCharacterAttachResponse>('character', parentPluralName, 'characters')
})