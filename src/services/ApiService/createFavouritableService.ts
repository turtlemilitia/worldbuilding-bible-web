import { TFavourite } from '../../types'
import { TAttachableApi } from './createAttachableService'
import api from '../../api'

export interface TFavouriteAttachRequest {
  favouritableType: string,
  favouritableId: number,
}

export type TFavouriteAttachResponse = TFavourite

export type TFavouritableApi = { favourites: TAttachableApi<TFavouriteAttachRequest, TFavouriteAttachResponse> }

export const createFavouritableService = (): TFavouritableApi => ({
  favourites: {

    attach: (attachableId, data) => {
      return api.post(`/api/favourites?include=favouritable`, data)
    },
    detach: (attachableId, id) => {
      return api.delete(`/api/favourites/${id}`)
    }

  }
})