import { AxiosResponse } from 'axios'
import { TLocationGovernmentType } from '../types'
import api from '../api'

type TGovernmentTypeIndexResponse = {
  data: TLocationGovernmentType[];
}

export const indexGovernmentTypes = (): Promise<AxiosResponse<TGovernmentTypeIndexResponse>> => {

  return api.get(`/api/government-types`)

}