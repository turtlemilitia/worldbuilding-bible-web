import { TUser } from '../../../types'
import { createChildApiService } from '../createApiService'
import { createCharacterableService } from '../createCharacterableService'
import { createFavouritableService } from '../createFavouritableService'
import { createPinnableService } from '../createPinnableService'
import api from '../../../api'

export type TUserRequest = {
  name: TUser['name'];
  email: TUser['email'];
}

export type TUserResponse = TUser;

export type TUserIndexResponse = TUser[];

const UserService = {
  viewOwn: (query = {}) => {
    return api.get(`/api/user?${new URLSearchParams(query).toString()}`)
  },
  ...createChildApiService<TUserRequest, TUserIndexResponse, TUserResponse>('campaigns', 'users'),
  ...createCharacterableService('users'),
  ...createFavouritableService('users'),
  ...createPinnableService('users')
}

export default UserService