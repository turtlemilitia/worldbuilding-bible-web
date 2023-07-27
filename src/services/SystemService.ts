import axios, { AxiosResponse } from 'axios'
import { TSystem } from '../types'

const apiUrl = process.env.REACT_APP_API_URL

export const indexSystems = (): Promise<AxiosResponse> => {

  return axios.get(`${apiUrl}/api/systems`)

}

export const viewSystem = (slug: string): Promise<AxiosResponse<TSystem>> => {

  return axios.get(`${apiUrl}/api/systems/${slug}`)

}

export const storeSystem = (data: TSystem): Promise<AxiosResponse<TSystem>> => {

  return axios.post(`${apiUrl}/api/systems`, data)

}

export const updateSystem = (slug: string, data: Partial<TSystem>) => {
  return axios.put(`${apiUrl}/api/systems/${slug}`, data)
}

export const destroySystem = (slug: string) => {
  return axios.put(`${apiUrl}/api/systems/${slug}`)
}