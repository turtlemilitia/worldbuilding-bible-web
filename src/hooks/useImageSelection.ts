import { useAppSelector } from '../hooks'
import { RootState } from '../store'
import { attachImageToEntity } from '../services/ImageableService'
import { useCallback } from 'react'
import {TCanHaveImages, TImage} from '../types'

type TProps = {
  entityType: string;
  entityId?: string | number;
  persistedData?: TCanHaveImages;
  updatePersistedData: (data: TCanHaveImages) => any;
}
const useImageSelection = ({ entityType, entityId, persistedData, updatePersistedData }: TProps) => {

  const { imageTypes } = useAppSelector((state: RootState) => state.imageTypes) // redux

  const onImageSelected = useCallback(async (imageId: number, imageType?: string) => {
    if (!entityId) {
      return null
    }
    return attachImageToEntity(entityType, entityId.toString(), {
      image_id: imageId,
      type_id: imageTypes.find(type => type.name.toLowerCase() === imageType)?.id || null
    })
  }, [entityId, entityType, imageTypes])

  const addImageToSelection = (originalImages: TImage[], newImage: TImage, imageType?: string) => {
    if (originalImages && imageType && ['cover', 'profile'].includes(imageType)) {
      const existingImageOfType = originalImages?.find(image => image.pivot?.type.name.toLowerCase() === imageType)?.original
      if (existingImageOfType) {
        return [
          ...originalImages.map(image => image.pivot?.type.name.toLowerCase() === imageType ? newImage : image)
        ]
      }
    }
    return [
      ...(originalImages || []),
      { ...newImage }
    ]
  }

  const handleOnImageSelected = useCallback((id: number, imageType: string) => onImageSelected(id, imageType).then((result) => {
    if (result && result.data) {
      const images = addImageToSelection(persistedData?.images || [], result.data.data, imageType)
      updatePersistedData({ images })
    }
    return result
  }), [onImageSelected, persistedData?.images, updatePersistedData])

  const getImage = useCallback((type: 'cover' | 'profile') => persistedData?.images?.find(image => image.pivot?.type.name.toLowerCase() === type)?.original, [persistedData?.images])

  return { getImage, handleOnImageSelected }
}

export default useImageSelection
