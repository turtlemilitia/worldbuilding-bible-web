import { AxiosResponse } from 'axios'
import { TNote, TNotebook, TQueryParams } from '../types'
import api from '../api'

export interface TNoteRequest {
  name: string;
  content: string;
}
type TNoteResponse = {
  data: TNote;
}
type TNoteIndexResponse = {
  data: TNote[];
}

export const indexNotes = (notebookId: TNotebook['slug'], query: TQueryParams = {}): Promise<AxiosResponse<TNoteIndexResponse>> => {

  return api.get(`/api/notebooks/${notebookId}/notes?${new URLSearchParams(query).toString()}`)

}

export const viewNote = (slug: string, query: TQueryParams = {}): Promise<AxiosResponse<TNoteResponse>> => {

  return api.get(`/api/notes/${slug}?${new URLSearchParams(query).toString()}`)

}

export const storeNote = (notebookId: TNotebook['slug'], data: TNoteRequest): Promise<AxiosResponse<TNoteResponse>> => {

  return api.post(`/api/notebooks/${notebookId}/notes`, data)

}

export const updateNote = (slug: string, data: Partial<TNoteRequest>): Promise<AxiosResponse<TNoteResponse>> => {
  return api.put(`/api/notes/${slug}`, data)
}

export const destroyNote = (slug: string): Promise<AxiosResponse<void>> => {
  return api.delete(`/api/notes/${slug}`)
}