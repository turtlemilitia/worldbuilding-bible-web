import { TNote } from '../types'
import api from '../api'
import { AxiosResponse } from 'axios'

interface TNotableStoreRequest {
  noteId: TNote['id'],
}

interface TNoteAttachResponse {
  data: TNote
}

export const attachNoteToEntity = (notableType: string, notableId: string, data: TNotableStoreRequest): Promise<AxiosResponse<TNoteAttachResponse>> => {
  return api.post(`/api/${notableType}/${notableId}/notes?include=note`, data)
}