import { AxiosResponse } from 'axios'
import { TConcept, TCompendium, TQueryParams } from '../types'
import api from '../api'

export interface TConceptRequest {
  name: string;
  content: string;
}
type TConceptResponse = {
  data: TConcept;
}
type TConceptIndexResponse = {
  data: TConcept[];
}

export const indexConcepts = (compendiumId: TCompendium['slug'], query: TQueryParams = {}): Promise<AxiosResponse<TConceptIndexResponse>> => {

  return api.get(`/api/compendia/${compendiumId}/concepts?${new URLSearchParams(query).toString()}`)

}

export const viewConcept = (slug: string, query: TQueryParams = {}): Promise<AxiosResponse<TConceptResponse>> => {

  return api.get(`/api/concepts/${slug}?${new URLSearchParams(query).toString()}`)

}

export const storeConcept = (compendiumId: TCompendium['slug'], data: TConceptRequest, query: TQueryParams = {}): Promise<AxiosResponse<TConceptResponse>> => {

  return api.post(`/api/compendia/${compendiumId}/concepts?${new URLSearchParams(query).toString()}`, data)

}

export const updateConcept = (slug: string, data: Partial<TConceptRequest>, query: TQueryParams = {}): Promise<AxiosResponse<TConceptResponse>> => {
  return api.put(`/api/concepts/${slug}?${new URLSearchParams(query).toString()}`, data)
}

export const destroyConcept = (slug: string): Promise<AxiosResponse<void>> => {
  return api.delete(`/api/concepts/${slug}`)
}