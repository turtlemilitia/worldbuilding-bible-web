import { useAppDispatch, useAppSelector } from '@/hooks'
import { useCallback, useMemo } from 'react'
import { TApi, TQueryParams } from '@/services/ApiService/types'
import { Slice } from '@reduxjs/toolkit'
import { TEntitySliceState } from '@/reducers/createEntitySlice'
import { TIndexSliceState } from '@/reducers/createIndexSlice'
import {
  Identifiable,
  TCampaignRelationships,
  TCompendiumRelationships, TGenericPost,
} from '@/types'
import { mapPlural } from '@/utils/dataUtils'

export type TDataManager<TEntity, TRequest> = {
  entityName: string;
  entity?: TEntity,
  isPermanent?: boolean,
  setData: (data: TEntity) => any,
  updateData: (data: Partial<TEntity>) => any,
  removeData: (id: number) => any,
  setChildData: (id: number, field: string, data: Identifiable) => any,
  updateChildData: (id: number, field: string, data: Identifiable) => any,
  removeChildData: (id: number, field: string, childId: number) => any,
  view: (id: number, query?: TQueryParams) => Promise<TEntity>,
  store: (payload: TRequest, query?: TQueryParams) => Promise<TEntity>,
  update: (id: number, payload: Partial<TRequest>, query?: TQueryParams) => Promise<TEntity>,
  destroy: (id: number) => Promise<any>,
}

export const useDataManager = <TEntity extends TGenericPost, TRequest, TIndexResponse, TResponse extends TEntity> (
  name: 'campaigns' | 'compendia' | 'notes' | 'systems',
  id: number | undefined,
  indexSlice: Slice<TIndexSliceState<TEntity>>,
  api: TApi<TRequest, TIndexResponse, TResponse>,
): TDataManager<TEntity, TRequest> => {

  const dispatch = useAppDispatch()

  const { data } = useAppSelector(state => state[name]) as { data: TEntity[] }
  const entity: TEntity|undefined = useMemo(() => data?.find(item => item.id === id), [id, data])

  // REDUX MANAGEMENT
  const setData = useCallback((data: TEntity) => {
    dispatch(indexSlice.actions.setOne(data))
  }, [])

  const updateData = useCallback((data: Partial<TEntity>) => {
    dispatch(indexSlice.actions.updateOne(data))
  }, [])

  const removeData = useCallback((id: number) => {
    dispatch(indexSlice.actions.removeOne({ id }))
  }, [])

  const setChildData = useCallback((id: number, field: string, data: Identifiable) => {
    dispatch(indexSlice.actions.setChildData({ id, field, data }))
  }, [])

  const updateChildData = useCallback((id: number, field: string, data: Identifiable) => {
    dispatch(indexSlice.actions.updateChildData({ id, field, data }))
  }, [])

  const removeChildData = useCallback((id: number, field: string, childId: number) => {
    dispatch(indexSlice.actions.removeChildData({ id, field, childId }))
  }, [])

  const view = useCallback(async (id: number, query: TQueryParams = {}): Promise<TEntity> => {
    const { data } = await api.view(id, query)
    setData(data.data)
    return data.data
  }, [])

  const store = useCallback(async (payload: TRequest, query: TQueryParams = {}) => {
    const { data } = await api.store(payload, query)
    setData(data.data)
    return data.data
  }, [])

  const update = useCallback(async (id: number, payload: Partial<TRequest>, query: TQueryParams = {}) => {
    const { data } = await api.update(id, payload, query)
    updateData(data.data)
    return data.data
  }, [])

  const destroy = useCallback(async (id: number) => {
    await api.destroy(id)
    removeData(id)
  }, [])

  return {
    entityName: name,
    entity,
    setData,
    updateData,
    removeData,
    setChildData,
    updateChildData,
    removeChildData,
    view,
    store,
    update,
    destroy
  }
}

