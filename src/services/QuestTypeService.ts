import { AxiosResponse } from 'axios'
import { TQuestType } from '../types'
import api from '../api'

type TQuestTypeIndexResponse = {
  data: TQuestType[];
}

export const indexQuestTypes = (): Promise<AxiosResponse<TQuestTypeIndexResponse>> => {

  return api.get(`/api/quest-types`)

}