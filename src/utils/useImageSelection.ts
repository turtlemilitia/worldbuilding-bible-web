import { useAppSelector } from '../hooks'
import { RootState } from '../store'
import { attachImageToEntity } from '../services/ImageableService'
import { useCallback } from 'react'
import { TImage } from '../types'

type TProps = {
  entityType: string;
  entityId?: string|number;
}
const useImageSelection = ({ entityType, entityId }: TProps) => {

  const { imageTypes } = useAppSelector((state: RootState) => state.imageTypes) // redux

  const onImageSelected = useCallback(async (imageId: number, imageType?: string) => {
    if (!entityId) {
      return null;
    }
    return attachImageToEntity(entityType, entityId.toString(), {
      image_id: imageId,
      type_id: imageTypes.find(type => type.name.toLowerCase() === imageType)?.id || null
    })
  }, [entityId, entityType, imageTypes])

  const addImageToSelection = (originalImages: TImage[], newImage: TImage) => {
    const imageType = 'cover';
    const coverImage = originalImages?.find(image => image.pivot?.type.name.toLowerCase() === 'cover')?.original;
    return imageType === 'cover' && originalImages && coverImage ? [
      ...originalImages.map(image => image.pivot?.type.name.toLowerCase() === 'cover' ? newImage : image)
    ] : [
      ...(originalImages || []),
      { ...newImage }
    ]
  }

  return { onImageSelected, addImageToSelection }
}

export default useImageSelection