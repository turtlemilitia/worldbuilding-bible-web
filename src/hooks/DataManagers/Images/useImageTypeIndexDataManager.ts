import { TImageType } from '@/types'
import { useIndexDataManager, TIndexDataManager } from '../useIndexDataManager'
import { imageTypesIndexSlice } from '@/reducers/imageType/imageTypesIndexSlice'
import ImageTypeService from '../../../services/ApiService/Images/ImageTypeService'

export type TImageTypeIndexDataManager = TIndexDataManager<TImageType> & {
  imageTypes?: TImageType[]
}

const useImageTypeIndexDataManager = (): TImageTypeIndexDataManager => {
  const manager = useIndexDataManager(
    'imageTypes',
    imageTypesIndexSlice,
    ImageTypeService,
  )
  return {
    ...manager,
    imageTypes: manager.list,
  }
}

export default useImageTypeIndexDataManager