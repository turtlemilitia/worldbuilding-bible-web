import useImageSelection from '../useImageSelection'
import { useCallback } from 'react'
import { TCharacter } from '../../types'
import {TUseImageHandler} from "../../components/Post/types";

type TProps = {
  persistedData?: TCharacter
  updatePersistedData: (data: Partial<TCharacter>) => any
}
const useCharacterImageHandling = ({persistedData, updatePersistedData}: TProps): TUseImageHandler => {

  const { onImageSelected, addImageToSelection } = useImageSelection({
    entityType: 'characters',
    entityId: persistedData?.slug
  })

  const handleOnImageSelected = useCallback((id: number, imageType: string) => onImageSelected(id, imageType).then((result) => {
    if (result && result.data) {
      const images = addImageToSelection(persistedData?.images || [], result.data.data, imageType)
      updatePersistedData({ images })
    }
    return result
  }), [onImageSelected, addImageToSelection, persistedData?.images, updatePersistedData])

  const getImage = useCallback((type: 'cover' | 'profile') => persistedData?.images?.find(image => image.pivot?.type.name.toLowerCase() === type)?.original, [persistedData?.images])

  return {
    handleOnImageSelected,
    getImage
  }
}

export default useCharacterImageHandling;
