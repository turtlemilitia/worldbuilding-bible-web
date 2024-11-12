import { useAppDispatch, useAppSelector } from '@/hooks'
import { useCallback } from 'react'
import { TIndexApi, TQueryParams } from '@/services/ApiService/types'
import { Slice } from '@reduxjs/toolkit'
import { TIndexSliceState } from '@/reducers/createIndexSlice'

export type TIndexDataManager<TEntity> = {
  list?: (TEntity)[],
  setData: (data: TEntity[]) => any,
  setOne: (data: TEntity) => any,
  updateOne: (data: TEntity) => any,
  removeOne: (id: string|number) => any,
  index: (query?: TQueryParams) => Promise<TEntity[]>,
}

export const useIndexDataManager = <TEntity, TIndexResponse extends TEntity[]> (
  name: 'campaigns' | 'compendia' | 'notes' | 'systems' | 'images' | 'imageTypes' | 'governmentTypes' | 'locationTypes' | 'questTypes' | 'encounterTypes',
  slice: Slice<TIndexSliceState<TEntity>>,
  api: TIndexApi<TIndexResponse>,
): TIndexDataManager<TEntity> => {

  const dispatch = useAppDispatch()

  const { data: list } = useAppSelector(state => state[name]) as { data?: TEntity[] }

  // REDUX MANAGEMENT
  const setData = useCallback((data: TEntity[]) => {
    dispatch(slice.actions.set(data))
  }, [])

  const setOne = useCallback((one: TEntity) => {
    dispatch(slice.actions.setOne(one))
  }, [])

  const updateOne = useCallback((one: TEntity) => {
    dispatch(slice.actions.updateOne(one))
  }, [])

  const removeOne = useCallback((id: string|number) => {
    dispatch(slice.actions.removeOne(id))
  }, [])

  const index = useCallback(async (query: TQueryParams = {}) => {
    const { data } = await api.index(query)
    setData(data.data)
    return data.data
  }, [])

  return {
    list,
    setData,
    setOne,
    updateOne,
    removeOne,
    index
  }
}

