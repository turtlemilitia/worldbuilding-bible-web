import { Slice } from '@reduxjs/toolkit'
import { TEntitySliceState } from '../../reducers/createEntitySlice'
import { TImageableApi, TImageAttachRequest } from '../../services/ApiService/createImageableService'
import { useDispatch } from 'react-redux'
import { useCallback } from 'react'
import { TImage } from '../../types'

type useImageableDataManager = {
  attach: (entityId: string | number, payload: TImageAttachRequest, imageType: string) => void,
  detach: (imageableId: number | string, id: number | string) => void,
}
export type hasImageableDataManager = { images: useImageableDataManager }

export const createImageableDataManager = <TEntity> (
  slice: Slice<TEntitySliceState<TEntity>>,
  api: TImageableApi['images']
): useImageableDataManager => {

  const dispatch = useDispatch()

  const attachData = useCallback((data: TImage, imageType: string) => {
    dispatch(slice.actions.setImage({ data, imageType }))
  }, [])

  const dettachData = useCallback((id: string | number) => {
    dispatch(slice.actions.removeChildData({ field: 'images', id }))
  }, [])

  const attach = useCallback(async (entityId: string | number, payload: TImageAttachRequest, imageType: string) => {
    const { data } = await api.attach(entityId, payload)
    attachData(data.data, imageType)
    return data.data
  }, [])

  const detach = useCallback(async (imageableId: number | string, id: number | string) => {
    await api.dettach(imageableId, id)
    dettachData(id)
  }, [])

  return {
    attach,
    detach
  }

}