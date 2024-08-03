import { TImageType } from '../../../types'
import ImageTypeService from '../../../services/ApiService/Images/ImageService'
import { createIndexDataManager, TIndexDataManager } from '../createIndexDataManager'
import { imageTypesIndexSlice } from '../../../reducers/imageType/imageTypesIndexSlice'

type TImageTypeIndexDataManager = TIndexDataManager<TImageType> & {
  imageTypes?: TImageType[]
}

const useImageTypeIndexDataManager = (): TImageTypeIndexDataManager => {
  const manager = createIndexDataManager(
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