import { useCallback } from 'react'
import { hasImageableDataManager, TDataManager } from './DataManagers'
import { TCanHaveImages, TGenericPostBasic } from '../types'
import useImageTypeIndexDataManager from './DataManagers/Images/useImageTypeIndexDataManager'

type TProps<TEntity> = {
  manager: TDataManager<TEntity, any> & hasImageableDataManager
  canHaveProfileImage?: boolean
}
const useImageSelection = <TEntity extends TGenericPostBasic & TCanHaveImages> ({ manager, canHaveProfileImage = false }: TProps<TEntity>) => {

  const { imageTypes } = useImageTypeIndexDataManager() // redux

  const handleOnImageSelected = useCallback(async (id: number, imageType: string) => {
    debugger;
    if (!manager.entity?.slug) {
      return null
    }
    const typeId = imageTypes?.find(type => type.name.toLowerCase() === imageType)?.id || null;
    return manager.images.attach(manager.entity.slug, { image_id: id, type_id: typeId }, imageType)
  }, [manager.entity, imageTypes])

  const getImage = useCallback((type: 'cover' | 'profile') => manager.entity?.images?.find(image => image.pivot?.type?.name.toLowerCase() === type)?.original, [manager.entity?.images])

  return { getImage, handleOnImageSelected, canHaveProfileImage }
}

export default useImageSelection
