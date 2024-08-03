import { TImageType } from '../../../types'
import ImageTypeService from '../../../services/ApiService/Images/ImageService'
import { useIndexDataManager, TIndexDataManager } from '../useIndexDataManager'
import { imageTypesIndexSlice } from '../../../reducers/imageType/imageTypesIndexSlice'

type TImageTypeIndexDataManager = TIndexDataManager<TImageType> & {
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