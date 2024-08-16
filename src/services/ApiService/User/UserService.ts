import { TUser } from '../../../types'
import { createApiService } from '../createApiService'
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
  ...createApiService<TUserRequest, TUserIndexResponse, TUserResponse>('users'),
  ...createCharacterableService('users'),
  ...createFavouritableService('users'),
  ...createPinnableService('users')
}

export default UserService