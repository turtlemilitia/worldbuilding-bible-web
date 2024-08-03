import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../hooks'
import { useCallback } from 'react'
import { TApi, TQueryParams } from '../../services/ApiService/types'
import { Slice } from '@reduxjs/toolkit'
import { TEntitySliceState } from '../../reducers/createEntitySlice'
import { TIndexSliceState } from '../../reducers/createIndexSlice'
import { TGenericPostBasic } from '../../types'

export type TDataManager<TEntity, TRequest> = {
  entity?: TEntity & TGenericPostBasic,
  setData: (data: TEntity) => any,
  updateData: (data: Partial<TEntity>) => any,
  removeData: (id: string | number) => any,
  view: (id: string | number, query?: TQueryParams) => Promise<TEntity>,
  store: (payload: TRequest, query?: TQueryParams) => Promise<TEntity>,
  update: (id: string | number, payload: Partial<TRequest>, query?: TQueryParams) => Promise<TEntity>,
  destroy: (id: string | number) => Promise<any>,
}

export const createDataManager = <TEntity extends TGenericPostBasic, TRequest, TIndexResponse, TResponse extends TEntity> (
  name: 'campaign' | 'compendium' | 'notebook' | 'system',
  slice: Slice<TEntitySliceState<TEntity>>,
  indexSlice: Slice<TIndexSliceState<TEntity>>,
  api: TApi<TRequest, TIndexResponse, TResponse>,
): TDataManager<TEntity, TRequest> => {

  const dispatch = useDispatch()

  const { data: entity, fetching } = useAppSelector(state => state[name]) as { data?: TEntity, fetching: boolean }

  // REDUX MANAGEMENT
  const setData = useCallback((data: TEntity) => {
    dispatch(slice.actions.set(data))
    dispatch(indexSlice.actions.setChildData(data))
  }, [])

  const updateData = useCallback((data: Partial<TEntity>) => {
    dispatch(slice.actions.update(data))
    dispatch(indexSlice.actions.updateChildData(data))
  }, [])

  const removeData = useCallback((id: string | number) => {
    dispatch(slice.actions.set(undefined))
    dispatch(indexSlice.actions.removeChildData({ field: name, id }))
  }, [])

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
    entity,
    setData,
    updateData,
    removeData,
    view,
    store,
    update,
    destroy
  }
}

