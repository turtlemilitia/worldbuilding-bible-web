import { AxiosResponse } from 'axios'
import api from '../../api'

export type TAttachableApi<TRequest, TResponse> = {
  attach: (attachableId: string | number, data: TRequest) => Promise<AxiosResponse<{ data: TResponse }>>
  dettach: (attachableId: string | number, id: number | string) => Promise<AxiosResponse<void>>
}

export const createAttachableService = <TRequest, TResponse> (name: string, attachablePluralName: string, pluralName: string): TAttachableApi<TRequest, TResponse> => ({

  attach: (attachableId, data) => {
    return api.post(`/api/${attachablePluralName}/${attachableId}/${pluralName}?include=${name}`, data)
  },
  dettach: (attachableId, id) => {
    return api.delete(`/api/${attachablePluralName}/${attachableId}/${pluralName}/${id}`)
  }

})