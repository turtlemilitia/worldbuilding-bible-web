import { AxiosResponse } from 'axios'
import { TNotebook, TQueryParams } from '../types'
import api from '../api'

export type TNotebookRequest = {
  name: string;
  content: string;
}
interface TNotebookResponse {
  data: TNotebook;
}
interface TNotebookIndexResponse {
  data: TNotebook[];
}

export const indexNotebooks = (query: TQueryParams = {}): Promise<AxiosResponse<TNotebookIndexResponse>> => {

  return api.get(`/api/notebooks?${new URLSearchParams(query).toString()}`)

}

export const viewNotebook = (slug: string, query: TQueryParams = {}): Promise<AxiosResponse<TNotebookResponse>> => {

  return api.get(`/api/notebooks/${slug}?${new URLSearchParams(query).toString()}`)

}

export const storeNotebook = (data: TNotebookRequest, query: TQueryParams = {}): Promise<AxiosResponse<TNotebookResponse>> => {

  return api.post(`/api/notebooks?${new URLSearchParams(query).toString()}`, data)

}

export const updateNotebook = (slug: string, data: Partial<TNotebookRequest>, query: TQueryParams = {}): Promise<AxiosResponse<TNotebookResponse>> => {
  return api.put(`/api/notebooks/${slug}?${new URLSearchParams(query).toString()}`, data)
}

export const destroyNotebook = (slug: string): Promise<AxiosResponse<void>> => {
  return api.delete(`/api/notebooks/${slug}`)
}