import { useAppSelector } from '../hooks'
import { RootState } from '../store'
import { useCallback } from 'react'
import { hasImageableDataManager, TDataManager } from './DataManagers'
import { TCanHaveImages, TGenericPostBasic } from '../types'

type TProps<TEntity> = {
  manager: TDataManager<TEntity, any> & hasImageableDataManager
  canHaveProfileImage?: boolean
}
const useImageSelection = <TEntity extends TGenericPostBasic & TCanHaveImages> ({ manager, canHaveProfileImage = false }: TProps<TEntity>) => {

  const { data: imageTypes } = useAppSelector((state: RootState) => state.imageTypes) // redux

  const handleOnImageSelected = useCallback(async (id: number, imageType: string) => {
    if (!manager.entity?.slug) {
      return null
    }
    const typeId = imageTypes.find(type => type.name.toLowerCase() === imageType)?.id || null;
    return manager.images.attach(manager.entity.slug, { image_id: id, type_id: typeId }, imageType)
  }, [])

  const getImage = useCallback((type: 'cover' | 'profile') => manager.entity?.images?.find(image => image.pivot?.type.name.toLowerCase() === type)?.original, [manager.entity?.images])

  return { getImage, handleOnImageSelected, canHaveProfileImage }
}

export default useImageSelection
