import { AxiosResponse } from 'axios'
import api from '../../api'

export type TAttachableApi<TRequest, TResponse> = {
  attach: (notableId: string | number, data: TRequest) => Promise<AxiosResponse<{ data: TResponse }>>
  dettach: (notableId: string | number, id: number | string) => Promise<AxiosResponse<void>>
}

export const createAttachableService = <TRequest, TResponse> (name: string, parentPluralName: string, pluralName: string): TAttachableApi<TRequest, TResponse> => ({

  attach: (notableId, data) => {
    return api.post(`/api/${parentPluralName}/${notableId}/${pluralName}?include=${name}`, data)
  },
  dettach: (notableId, id) => {
    return api.post(`/api/${parentPluralName}/${notableId}/${pluralName}/${id}`)
  }

})