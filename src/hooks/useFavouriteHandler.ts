import { hasFavouritesAttachableDataManager } from './DataManagers/useAttachableDataManager'
import { TFavouriteHandler } from '@/components/Post/types'
import useAuthUserDataManager from './DataManagers/useAuthUserDataManager'
import { useCallback, useMemo } from 'react'
import { TDataManager } from './DataManagers'
import { TFavourite, TGenericPostBasic } from '@/types'

type TProps<TEntity> = {
  manager: TDataManager<TEntity, any> & Partial<hasFavouritesAttachableDataManager>
}
const useFavouriteHandler = <T extends TGenericPostBasic> ({ manager }: TProps<T>): TFavouriteHandler => {

  const { user: authUser, favourites: favouritableDataManager } = useAuthUserDataManager();

  const favourite: TFavourite|null = useMemo(() => {
    if (!authUser?.favourites) {
      return null;
    }
    return authUser.favourites.find(favourite => {
      return favourite.favouritableType === manager.entityName && favourite.favouritable.id === manager.entity?.id
    }) ?? null
  }, [authUser?.favourites, manager.entityName, manager.entity])

  const isFavourited: boolean = useMemo(() => !!favourite, [favourite])

  const toggleFavourite = useCallback(async () => {
    if (!authUser || !manager.entity) {
      return;
    }
    if (favourite) {
      return favouritableDataManager.detach(authUser.id, favourite.id)
    }
    return favouritableDataManager.attach(authUser.id, {
      favouritableId: manager.entity.id,
      favouritableType: manager.entityName,
    })
  }, [authUser, manager.entity, favourite])

  return {
    toggleFavourite,
    isFavourited
  }
}

export default useFavouriteHandler;