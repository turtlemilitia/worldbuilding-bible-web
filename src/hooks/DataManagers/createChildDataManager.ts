import { TChildApi, TQueryParams } from '../../services/ApiService/types'
import { TGenericPostBasic } from '../../types'
import { TEntitySliceState } from '../../reducers/createEntitySlice'
import { Slice } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../hooks'
import { useCallback } from 'react'
import { TUseDataManager } from './createDataManager'

export type TUseChildDataManager<TParentEntity, TEntity, TRequest> = TUseDataManager<TEntity, TRequest> & {
  parent?: TParentEntity,
  setChildData: (field: string, data: TGenericPostBasic) => any,
  updateChildData: (field: string, data: TGenericPostBasic) => any,
  removeChildData: (field: string, id: string | number) => any,
}

export const createChildDataManager = <TParentEntity extends TGenericPostBasic, TEntity, TRequest, TIndexResponse, TResponse extends TEntity> (
  name: 'quest' | 'encounter' | 'session' | 'note' | 'character' | 'concept' | 'currency' | 'deity' | 'faction' | 'item' | 'language' | 'location' | 'naturalResource' | 'pantheon' | 'plane' | 'religion' | 'species' | 'spell' | 'story',
  parentName: 'campaign' | 'notebook' | 'compendium',
  slice: Slice<TEntitySliceState<TEntity>>,
  parentSlice: Slice<TEntitySliceState<TParentEntity>>,
  api: TChildApi<TRequest, TIndexResponse, TResponse>,
): TUseChildDataManager<TParentEntity, TEntity, TRequest> => {

  const dispatch = useDispatch()

  const { data: parent } = useAppSelector(state => state[parentName]) as { data?: TParentEntity }
  const { data: entity } = useAppSelector(state => state[name]) as { data?: TEntity }

  // REDUX MANAGEMENT
  const setData = useCallback((data: TEntity) => {
    dispatch(slice.actions.set(data))
    dispatch(parentSlice.actions.setChildData(data))
  }, [])

  const updateData = useCallback((data: Partial<TEntity>) => {
    dispatch(slice.actions.update(data))
    dispatch(parentSlice.actions.updateChildData(data))
  }, [])

  const removeData = useCallback((slug: string) => {
    dispatch(slice.actions.set(null))
    dispatch(parentSlice.actions.removeChildData({ field: name, id: slug }))
  }, [])

  const setChildData = useCallback((field: string, data: TGenericPostBasic) => {
    dispatch(slice.actions.setChildData({ field, data }))
  }, [])

  const updateChildData = useCallback((field: string, data: TGenericPostBasic) => {
    dispatch(slice.actions.updateChildData({ field, data }))
  }, [])

  const removeChildData = useCallback((field: string, id: string | number) => {
    dispatch(slice.actions.removeChildData({ field, id }))
  }, [])

  const view = useCallback(async (slug: string, query: TQueryParams = {}): Promise<TEntity> => {
    const { data } = await api.view(slug, query)
    setData(data.data)
    return data.data
  }, [])

  const store = useCallback(async (payload: TRequest, query: TQueryParams = {}) => {
    const { data } = await api.store((parent as TParentEntity).slug, payload, query)
    setData(data.data)
    return data.data
  }, [])

  const update = useCallback(async (slug: string, payload: Partial<TRequest>, query: TQueryParams = {}) => {
    const { data } = await api.update(slug, payload, query)
    updateData(data.data)
    return data.data
  }, [])

  const destroy = useCallback(async (slug: string) => {
    await api.destroy(slug)
    removeData(slug)
  }, [])

  return {
    parent,
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
