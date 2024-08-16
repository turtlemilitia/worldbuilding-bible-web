import { TFavourite } from '../../types'
import { createAttachableService, TAttachableApi } from './createAttachableService'

export interface TFavouriteAttachRequest {
  favouriteableTyoe: string,
  favouriteableId: number,
}

export type TFavouriteAttachResponse = TFavourite

export type TFavouritableApi = { favourites: TAttachableApi<TFavouriteAttachRequest, TFavouriteAttachResponse> }

export const createFavouritableService = (parentPluralName: 'users'): TFavouritableApi => ({
  favourites: createAttachableService<TFavouriteAttachRequest, TFavouriteAttachResponse>('favourite', parentPluralName, 'favourites')
})