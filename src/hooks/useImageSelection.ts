import { useCallback } from 'react'
import { hasImageableDataManager, TDataManager } from './DataManagers'
import { TCanHaveImages, TGenericPostBasic } from '../types'
import useImageTypeIndexDataManager from './DataManagers/Images/useImageTypeIndexDataManager'
import { getImageForEntity } from '@/utils/dataUtils'

type TProps<TEntity> = {
  manager: TDataManager<TEntity, any> & hasImageableDataManager
  canHaveProfileImage?: boolean
}
const useImageSelection = <TEntity extends TGenericPostBasic & TCanHaveImages> ({ manager, canHaveProfileImage = false }: TProps<TEntity>) => {

  const { imageTypes } = useImageTypeIndexDataManager() // redux

  const handleOnImageSelected = useCallback(async (id: number, imageType: string) => {
    if (!manager.entity?.id) {
      return null
    }
    const typeId = imageTypes?.find(type => type.name.toLowerCase() === imageType)?.id || null;
    return manager.images.attach(manager.entity.id, { image_id: id, type_id: typeId }, imageType)
  }, [manager.entity, imageTypes])

  const getImage = useCallback((type: 'cover' | 'profile') => manager.entity && getImageForEntity(manager.entity, type)?.original, [manager.entity?.images])

  return { getImage, handleOnImageSelected, canHaveProfileImage }
}

export default useImageSelection
