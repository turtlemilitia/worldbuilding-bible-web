import { AxiosResponse } from 'axios'
import { TCurrency, TCompendium } from '../types'
import api from '../api'

export interface TCurrencyRequest {
  name: string;
  content: string;
}
type TCurrencyResponse = {
  data: TCurrency;
}
type TCurrencyIndexResponse = {
  data: TCurrency[];
}

export const indexCurrencies = (compendiumId: TCompendium['slug'], withArr: string[] = []): Promise<AxiosResponse<TCurrencyIndexResponse>> => {

  return api.get(`/api/compendia/${compendiumId}/currencies${withArr.length ? `?with=${withArr.join(',')}` : ''}`)

}

export const viewCurrency = (slug: string, withArr: string[] = []): Promise<AxiosResponse<TCurrencyResponse>> => {

  return api.get(`/api/currencies/${slug}${withArr.length ? `?with=${withArr.join(',')}` : ''}`)

}

export const storeCurrency = (compendiumId: TCompendium['slug'], data: TCurrencyRequest): Promise<AxiosResponse<TCurrencyResponse>> => {

  return api.post(`/api/compendia/${compendiumId}/currencies`, data)

}

export const updateCurrency = (slug: string, data: Partial<TCurrencyRequest>): Promise<AxiosResponse<TCurrencyResponse>> => {
  return api.put(`/api/currencies/${slug}`, data)
}

export const destroyCurrency = (slug: string): Promise<AxiosResponse<void>> => {
  return api.put(`/api/currencies/${slug}`)
}