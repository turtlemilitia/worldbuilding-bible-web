import { AxiosResponse } from 'axios'
import { TLocation, TLocationGovernmentType, TLocationSize, TLocationType, TSetting } from '../types'
import api from '../api'

type TLocationTypeIndexResponse = {
  data: TLocationType[];
}

export const indexLocationTypes = (): Promise<AxiosResponse<TLocationTypeIndexResponse>> => {

  return api.get(`/api/location-types`)

}