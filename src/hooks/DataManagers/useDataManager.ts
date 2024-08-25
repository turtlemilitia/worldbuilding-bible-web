import { useAppDispatch, useAppSelector } from '../../hooks'
import { useCallback } from 'react'
import { TApi, TQueryParams } from '../../services/ApiService/types'
import { Slice } from '@reduxjs/toolkit'
import { TEntitySliceState } from '../../reducers/createEntitySlice'
import { TIndexSliceState } from '../../reducers/createIndexSlice'
import { TGenericPostBasic } from '../../types'

export type TDataManager<TEntity, TRequest> = {
  entityName: string;
  entity?: TEntity,
  isPermanent?: boolean,
  setData: (data: TEntity) => any,
  updateData: (data: Partial<TEntity>) => any,
  removeData: (id: string | number) => any,
  clearData: (id: string | number) => any,
  setChildData: (field: string, data: TGenericPostBasic) => any,
  updateChildData: (field: string, data: TGenericPostBasic) => any,
  removeChildData: (field: string, id: string | number) => any,
  view: (id: string | number, query?: TQueryParams) => Promise<TEntity>,
  store: (payload: TRequest, query?: TQueryParams) => Promise<TEntity>,
  update: (id: string | number, payload: Partial<TRequest>, query?: TQueryParams) => Promise<TEntity>,
  destroy: (id: string | number) => Promise<any>,
}

export const useDataManager = <TEntity, TRequest, TIndexResponse, TResponse extends TEntity> (
  name: 'campaign' | 'compendium' | 'notebook' | 'system' | 'authUser',
  slice: Slice<TEntitySliceState<TEntity>>,
  indexSlice: Slice<TIndexSliceState<TEntity>>,
  api: TApi<TRequest, TIndexResponse, TResponse>,
): TDataManager<TEntity, TRequest> => {

  const dispatch = useAppDispatch()

  const { data: entity, fetching } = useAppSelector(state => state[name]) as { data?: TEntity, fetching: boolean }

  // REDUX MANAGEMENT
  const setData = useCallback((data: TEntity) => {
    dispatch(slice.actions.set(data))
    dispatch(indexSlice.actions.setOne(data))
  }, [])

  const updateData = useCallback((data: Partial<TEntity>) => {
    dispatch(slice.actions.update(data))
    dispatch(indexSlice.actions.updateOne(data))
  }, [])

  const removeData = useCallback((id: string | number) => {
    clearData(id)
    dispatch(indexSlice.actions.removeOne({ field: name, id }))
  }, [])

  const clearData = useCallback((id: string | number) => {
    dispatch(slice.actions.clear(id))
  }, [])

  const setChildData = useCallback((field: string, data: TGenericPostBasic) => {
    dispatch(slice.actions.setChildData({ field, data }))
  }, [slice])

  const updateChildData = useCallback((field: string, data: TGenericPostBasic) => {
    dispatch(slice.actions.updateChildData({ field, data }))
  }, [slice])

  const removeChildData = useCallback((field: string, id: string | number) => {
    dispatch(slice.actions.removeChildData({ field, id }))
  }, [slice])

  const view = useCallback(async (id: string | number, query: TQueryParams = {}): Promise<TEntity> => {
    if (fetching) {
      // Wait until the current fetching operation is complete
      await new Promise<void>((resolve) => {
        const checkFetching = () => {
          if (!fetching) {
            resolve()
          } else {
            setTimeout(checkFetching, 100) // check every 100ms
          }
        }
        checkFetching()
      })
      return entity as TEntity
    }
    dispatch(slice.actions.setFetching(true))
    const { data } = await api.view(id, query)
    setData(data.data)
    dispatch(slice.actions.setFetching(false))
    return data.data
  }, [])

  const store = useCallback(async (payload: TRequest, query: TQueryParams = {}) => {
    const { data } = await api.store(payload, query)
    setData(data.data)
    return data.data
  }, [])

  const update = useCallback(async (id: string | number, payload: Partial<TRequest>, query: TQueryParams = {}) => {
    const { data } = await api.update(id, payload, query)
    updateData(data.data)
    return data.data
  }, [])

  const destroy = useCallback(async (id: string | number) => {
    await api.destroy(id)
    removeData(id)
  }, [])

  return {
    entityName: name,
    entity,
    setData,
    updateData,
    removeData,
    clearData,
    setChildData,
    updateChildData,
    removeChildData,
    view,
    store,
    update,
    destroy
  }
}

