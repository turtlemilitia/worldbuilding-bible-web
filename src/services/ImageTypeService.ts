import { TImageType } from '../types'
import { AxiosResponse } from 'axios'
import api from '../api'

type TImageTypeIndexResponse = {
  data: TImageType;
}

export const indexImageTypes = (): Promise<AxiosResponse<TImageTypeIndexResponse>> => {

  return api.get(`/api/image-types`)

}