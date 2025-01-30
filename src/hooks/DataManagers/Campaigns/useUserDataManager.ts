import { TCampaign, TUser } from '../../../types'
import userService, { TUserRequest } from '../../../services/ApiService/User/UserService'
import {
  hasCharactersAttachableDataManager,
  hasFavouritesAttachableDataManager, hasPermissionsAttachableDataManager,
  hasPinsAttachableDataManager,
  useCharacterableDataManager,
  useFavouritableDataManager, usePermissionableDataManager,
  usePinnableDataManager
} from '../useAttachableDataManager'
import { TChildDataManager, useChildDataManager } from '../useChildDataManager'
import campaignUserService from '../../../services/ApiService/User/CampaignUserService'
import { campaignsIndexSlice } from '@/reducers/campaign/campaignsIndexSlice'

type TUserDataManager = TChildDataManager<TCampaign, TUser, TUserRequest> & {
  campaign?: TCampaign,
  user?: TUser,
} & hasCharactersAttachableDataManager & hasFavouritesAttachableDataManager & hasPinsAttachableDataManager & hasPermissionsAttachableDataManager

/**
 * This is a read only data manager, so we're not
 */
const useUserDataManager = (campaignId?: number, id?: number): TUserDataManager => {

  const manager = useChildDataManager(
    'users',
    'campaigns',
    campaignId,
    id,
    campaignsIndexSlice,
    campaignUserService
  )

  return {
    ...manager,
    campaign: manager.parent,
    user: manager.entity,
    characters: useCharacterableDataManager(manager, userService.characters),
    favourites: useFavouritableDataManager(manager, userService.favourites),
    pins: usePinnableDataManager(manager, userService.pins),
    permissions: usePermissionableDataManager(manager, userService.permissions)
  }
}

export default useUserDataManager