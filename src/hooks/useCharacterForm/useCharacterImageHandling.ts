import useImageSelection from '../useImageSelection'
import { useCallback } from 'react'
import { updateCharacterData } from '../../reducers/compendium/character/characterSlice'
import { TCharacter } from '../../types'

type TProps = {
  persistedData?: TCharacter
  updatePersistedData: (data: Partial<TCharacter>) => any
}
const useCharacterImageHandling = ({persistedData, updatePersistedData}: TProps) => {

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
  }), [onImageSelected, addImageToSelection, persistedData?.images])

  const getImage = useCallback((type: 'cover' | 'profile') => persistedData?.images?.find(image => image.pivot?.type.name.toLowerCase() === type)?.original, [persistedData?.images])

  return {
    handleOnImageSelected,
    getImage
  }
}

export default useCharacterImageHandling;