import { hasFavouritesAttachableDataManager } from './DataManagers/useAttachableDataManager'
import { TFavouriteHandler } from '../components/Post/types'

type TProps<TEntity> = {
  manager: Partial<hasFavouritesAttachableDataManager>
}
const useFavouriteHandler = <T> ({ manager }: TProps<T>): TFavouriteHandler => {
  return {
    toggleFavourite: async () => {}, // todo
    isFavourited: false // todo
  }
}

export default useFavouriteHandler;