import { TImage } from '@/types'
import { useIndexDataManager, TIndexDataManager } from '../useIndexDataManager'
import ImageService from '@/services/ApiService/Images/ImageService'
import { imagesIndexSlice } from '@/reducers/image/imagesIndexSlice'

type TImageIndexDataManager = TIndexDataManager<TImage> & {
  images?: TImage[]
}

const useNoteIndexDataManager = (): TImageIndexDataManager => {
  const manager = useIndexDataManager(
    'images',
    imagesIndexSlice,
    ImageService,
  )
  return {
    ...manager,
    images: manager.list,
  }
}

export default useNoteIndexDataManager