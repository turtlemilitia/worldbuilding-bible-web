import { useAppSelector } from '../../hooks'
import { RootState } from '../../store'
import { attachImageToEntity } from '../../services/ImageableService'
import { useCallback } from 'react'
import { TImage } from '../../types'

type TProps = {
  entityType: string;
  entityId?: string | number;
}
const useImageSelection = ({ entityType, entityId }: TProps) => {

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

  return { onImageSelected, addImageToSelection }
}

export default useImageSelection