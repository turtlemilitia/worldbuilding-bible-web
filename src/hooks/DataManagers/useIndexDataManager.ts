import { useAppDispatch, useAppSelector } from '../../hooks'
import { useCallback } from 'react'
import { TIndexApi, TQueryParams } from '../../services/ApiService/types'
import { Slice } from '@reduxjs/toolkit'
import { TIndexSliceState } from '../../reducers/createIndexSlice'
import { TOptionList } from '../../types'

export type TIndexDataManager<TEntity> = {
  list?: (TEntity)[],
  setData: (data: TEntity[]) => any,
  index: (query?: TQueryParams) => Promise<TEntity[]>,
}

export const useIndexDataManager = <TEntity extends TOptionList, TIndexResponse extends TEntity[]> (
  name: 'campaigns' | 'compendia' | 'notebooks' | 'systems' | 'imageTypes' | 'governmentTypes' | 'locationTypes' | 'questTypes' | 'encounterTypes',
  slice: Slice<TIndexSliceState<TEntity>>,
  api: TIndexApi<TIndexResponse>,
): TIndexDataManager<TEntity> => {

  const dispatch = useAppDispatch()

  const { data: list } = useAppSelector(state => state[name]) as { data?: TEntity[] }

  // REDUX MANAGEMENT
  const setData = useCallback((data: TEntity[]) => {
    dispatch(slice.actions.set(data))
  }, [])

  const index = useCallback(async (query: TQueryParams = {}) => {
    const { data } = await api.index(query)
    setData(data.data)
    return data.data
  }, [])

  return {
    list,
    setData,
    index
  }
}

