import { TApi, TChildApi } from './types'
import api from '../../api'

export const createApiService = <TRequest, TIndexResponse, TResponse> (pluralName: string): TApi<TRequest, TIndexResponse, TResponse> => ({
  index: (query = {}) => {

    return api.get(`/api/${pluralName}?${new URLSearchParams(query).toString()}`)

  },
  view: (slug, query = {}) => {

    return api.get(`/api/${pluralName}/${slug}?${new URLSearchParams(query).toString()}`)

  },
  store: (data, query = {}) => {

    return api.post(`/api/${pluralName}?${new URLSearchParams(query).toString()}`, data)

  },
  update: (slug, data, query = {}) => {

    return api.put(`/api/${pluralName}/${slug}?${new URLSearchParams(query).toString()}`, data)

  },
  destroy: (slug) => {

    return api.delete(`/api/${pluralName}/${slug}`)

  }
})
export const createChildApiService = <TRequest, TIndexResponse, TResponse> (parentPluralName: string, pluralName: string): TChildApi<TRequest, TIndexResponse, TResponse> => ({
  ...createApiService<TRequest, TIndexResponse, TResponse>(pluralName),
  index: (parentId: string | number, query = {}) => {

    return api.get(`/api/${parentPluralName}/${parentId}/${pluralName}?${new URLSearchParams(query).toString()}`)

  },
  store: (parentId: string | number, data, query = {}) => {

    return api.post(`/api/${parentPluralName}/${parentId}/${pluralName}?${new URLSearchParams(query).toString()}`, data)

  },
})