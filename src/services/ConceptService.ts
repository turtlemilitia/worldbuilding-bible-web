import { AxiosResponse } from 'axios'
import { TConcept, TCompendium } from '../types'
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

export const indexConcepts = (compendiumId: TCompendium['slug'], withArr: string[] = []): Promise<AxiosResponse<TConceptIndexResponse>> => {

  return api.get(`/api/compendia/${compendiumId}/concepts${withArr.length ? `?with=${withArr.join(',')}` : ''}`)

}

export const viewConcept = (slug: string, withArr: string[] = []): Promise<AxiosResponse<TConceptResponse>> => {

  return api.get(`/api/concepts/${slug}${withArr.length ? `?with=${withArr.join(',')}` : ''}`)

}

export const storeConcept = (compendiumId: TCompendium['slug'], data: TConceptRequest): Promise<AxiosResponse<TConceptResponse>> => {

  return api.post(`/api/compendia/${compendiumId}/concepts`, data)

}

export const updateConcept = (slug: string, data: Partial<TConceptRequest>): Promise<AxiosResponse<TConceptResponse>> => {
  return api.put(`/api/concepts/${slug}`, data)
}

export const destroyConcept = (slug: string): Promise<AxiosResponse<void>> => {
  return api.put(`/api/concepts/${slug}`)
}