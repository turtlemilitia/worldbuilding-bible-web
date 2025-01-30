import { Slice } from '@reduxjs/toolkit'
import { TEntitySliceState } from '../../reducers/createEntitySlice'
import { TImageableApi, TImageAttachRequest } from '../../services/ApiService/createImageableService'
import { useCallback } from 'react'
import { useAppDispatch } from '../../hooks'
import { TImage } from '../../types'
import { TDataManager } from '@/hooks/DataManagers/useDataManager'

type TUseImageableDataManager = {
  attach: (entityId: number, payload: TImageAttachRequest, imageType: string) => void,
  detach: (imageableId: number, id: number) => void,
}
export type hasImageableDataManager = { images: TUseImageableDataManager }

export const useImageableDataManager = <TEntity> (
  parentManager: TDataManager<TEntity, any>,
  api: TImageableApi['images']
): TUseImageableDataManager => {

  const dispatch = useAppDispatch()

  const attachData = useCallback((imageableId: number, data: TImage, imageType: string) => {
    parentManager.setImage(imageableId, data, imageType)
  }, [])

  const dettachData = useCallback((imageableId: number, id: number) => {
    parentManager.removeChildData(imageableId, 'images', id)
  }, [])

  const attach = useCallback(async (imageableId: number, payload: TImageAttachRequest, imageType: string) => {
    const { data } = await api.attach(imageableId, payload)
    attachData(imageableId, data.data, imageType)
    return data.data
  }, [])

  const detach = useCallback(async (imageableId: number, id: number) => {
    await api.detach(imageableId, id)
    dettachData(imageableId, id)
  }, [])

  return {
    attach,
    detach
  }

}