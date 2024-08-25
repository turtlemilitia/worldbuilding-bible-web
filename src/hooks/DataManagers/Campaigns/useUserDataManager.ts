import { TCampaign, TUser } from '../../../types'
import userService, { TUserRequest } from '../../../services/ApiService/User/UserService'
import {
  hasCharactersAttachableDataManager, hasFavouritesAttachableDataManager, hasPinsAttachableDataManager,
  useAttachableDataManager,
  useCharacterableDataManager, useFavouritableDataManager
} from '../useAttachableDataManager'
import { userSlice } from '../../../reducers/auth/userSlice'
import { TChildDataManager, useChildDataManager } from '../useChildDataManager'
import { campaignSlice } from '../../../reducers/campaign/campaignSlice'
import campaignUserService from '../../../services/ApiService/User/CampaignUserService'

type TUserDataManager = TChildDataManager<TCampaign, TUser, TUserRequest> & {
  campaign?: TCampaign,
  user?: TUser,
} & hasCharactersAttachableDataManager & hasFavouritesAttachableDataManager & hasPinsAttachableDataManager

/**
 * This is a read only data manager, so we're not
 */
const useUserDataManager = (): TUserDataManager => {

  const manager = useChildDataManager(
    'user',
    'campaign',
    userSlice,
    campaignSlice,
    campaignUserService
  )

  return {
    ...manager,
    campaign: manager.parent,
    user: manager.entity,
    characters: useCharacterableDataManager(userSlice, userService.characters),
    favourites: useFavouritableDataManager(userSlice, userService.favourites),
    pins: useAttachableDataManager('pins', userSlice, userService.pins),
  }
}

export default useUserDataManager