import { AxiosResponse } from 'axios'
import { TLocationSize } from '../types'
import api from '../api'

type TLocationSizeIndexResponse = {
  data: TLocationSize[];
}

export const indexLocationSizes = (): Promise<AxiosResponse<TLocationSizeIndexResponse>> => {

  return api.get(`/api/location-sizes`)

}