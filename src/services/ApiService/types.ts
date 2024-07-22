import { AxiosResponse } from 'axios'

export type TQueryParams = string | string[][] | Record<string, string> | URLSearchParams

export type TApi<TRequest, TIndexResponse, TResponse> = {
  index: (query?: TQueryParams) => Promise<AxiosResponse<{data: TIndexResponse}>>
  view: (id: string | number, query?: TQueryParams) => Promise<AxiosResponse<{data: TResponse}>>
  store: (data: TRequest, query?: TQueryParams) => Promise<AxiosResponse<{data: TResponse}>>
  update: (id: string | number, data: Partial<TRequest>, query?: TQueryParams) => Promise<AxiosResponse<{data: TResponse}>>
  destroy: (id: string | number) => Promise<AxiosResponse<void>>
}

export type TChildApi<TRequest, TIndexResponse, TResponse> = {
  index: (parentId: string | number, query?: TQueryParams) => Promise<AxiosResponse<{data: TIndexResponse}>>
  view: (id: string | number, query?: TQueryParams) => Promise<AxiosResponse<{data: TResponse}>>
  store: (parentId: string | number, data: TRequest, query?: TQueryParams) => Promise<AxiosResponse<{data: TResponse}>>
  update: (id: string | number, data: Partial<TRequest>, query?: TQueryParams) => Promise<AxiosResponse<{data: TResponse}>>
  destroy: (id: string | number) => Promise<AxiosResponse<void>>
}