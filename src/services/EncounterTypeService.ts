import { AxiosResponse } from 'axios'
import { TEncounterType } from '../types'
import api from '../api'

type TEncounterTypeIndexResponse = {
  data: TEncounterType[];
}

export const indexEncounterTypes = (): Promise<AxiosResponse<TEncounterTypeIndexResponse>> => {

  return api.get(`/api/encounter-types`)

}