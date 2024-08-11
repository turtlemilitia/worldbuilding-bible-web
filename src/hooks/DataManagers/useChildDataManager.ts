import { TChildApi, TQueryParams } from '../../services/ApiService/types'
import { TGenericPostBasic } from '../../types'
import { TEntitySliceState } from '../../reducers/createEntitySlice'
import { Slice } from '@reduxjs/toolkit'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useCallback } from 'react'
import { TDataManager } from './useDataManager'
import { mapPlural } from '../../utils/dataUtils'

export type TChildDataManager<TParentEntity, TEntity, TRequest> = TDataManager<TEntity, TRequest> & {
  parent?: TParentEntity,
  setChildData: (field: string, data: TGenericPostBasic) => any,
  updateChildData: (field: string, data: TGenericPostBasic) => any,
  removeChildData: (field: string, id: string | number) => any,
}

export const useChildDataManager = <TParentEntity, TEntity, TRequest, TIndexResponse, TResponse extends TEntity> (
  name: 'quest' | 'encounter' | 'session' | 'note' | 'character' | 'concept' | 'currency' | 'deity' | 'faction' | 'item' | 'language' | 'location' | 'naturalResource' | 'pantheon' | 'plane' | 'religion' | 'species' | 'spell' | 'story',
  parentName: 'campaign' | 'notebook' | 'compendium',
  slice: Slice<TEntitySliceState<TEntity>>,
  parentSlice: Slice<TEntitySliceState<TParentEntity>>,
  api: TChildApi<TRequest, TIndexResponse, TResponse>,
): TChildDataManager<TParentEntity, TEntity, TRequest> => {

  const dispatch = useAppDispatch()

  const { data: parent } = useAppSelector(state => state[parentName]) as { data?: TParentEntity & TGenericPostBasic }
  const { data: entity } = useAppSelector(state => state[name]) as { data?: TEntity & TGenericPostBasic }

  // REDUX MANAGEMENT
  const setData = useCallback((data: TEntity) => {
    dispatch(slice.actions.set(data))
  }, [slice])

  const addData = useCallback((data: TEntity) => {
    dispatch(slice.actions.set(data))
    dispatch(parentSlice.actions.setChildData({ field: mapPlural(name), data }))
  }, [slice, parentSlice, name])

  const updateData = useCallback((data: Partial<TEntity>) => {
    dispatch(slice.actions.update(data))
    dispatch(parentSlice.actions.updateChildData({ field: mapPlural(name), data }))
  }, [slice, parentSlice, name])

  const removeData = useCallback((id: string | number) => {
    clearData(id)
    dispatch(parentSlice.actions.removeChildData({ field: mapPlural(name), id }))
  }, [parentSlice])

  const clearData = useCallback((id: string | number) => {
    dispatch(slice.actions.clear(id))
  }, [slice])

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
    const { data } = await api.view(id, query)
    setData(data.data)
    return data.data
  }, [api])

  const store = useCallback(async (payload: TRequest, query: TQueryParams = {}) => {
    const { data } = await api.store((parent as TGenericPostBasic).slug, payload, query)
    addData(data.data)
    return data.data
  }, [api, parent])

  const update = useCallback(async (id: string | number, payload: Partial<TRequest>, query: TQueryParams = {}) => {
    const { data } = await api.update(id, payload, query)
    updateData(data.data)
    return data.data
  }, [api])

  const destroy = useCallback(async (id: string | number) => {
    await api.destroy(id)
    removeData(id)
  }, [api])

  return {
    parent,
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
