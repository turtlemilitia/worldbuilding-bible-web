import { AxiosResponse } from 'axios'
import { TCurrency, TCompendium, TQueryParams } from '../types'
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

export const indexCurrencies = (compendiumId: TCompendium['slug'], query: TQueryParams = {}): Promise<AxiosResponse<TCurrencyIndexResponse>> => {

  return api.get(`/api/compendia/${compendiumId}/currencies?${new URLSearchParams(query).toString()}`)

}

export const viewCurrency = (slug: string, query: TQueryParams = {}): Promise<AxiosResponse<TCurrencyResponse>> => {

  return api.get(`/api/currencies/${slug}?${new URLSearchParams(query).toString()}`)

}

export const storeCurrency = (compendiumId: TCompendium['slug'], data: TCurrencyRequest, query: TQueryParams = {}): Promise<AxiosResponse<TCurrencyResponse>> => {

  return api.post(`/api/compendia/${compendiumId}/currencies?${new URLSearchParams(query).toString()}`, data)

}

export const updateCurrency = (slug: string, data: Partial<TCurrencyRequest>, query: TQueryParams = {}): Promise<AxiosResponse<TCurrencyResponse>> => {
  return api.put(`/api/currencies/${slug}?${new URLSearchParams(query).toString()}`, data)
}

export const destroyCurrency = (slug: string): Promise<AxiosResponse<void>> => {
  return api.delete(`/api/currencies/${slug}`)
}