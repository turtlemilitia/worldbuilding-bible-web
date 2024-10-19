import { authUserSlice } from '@/reducers/auth/authUserSlice'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { useCallback } from 'react'
import { TPermission, TUser } from '@/types'
import { TQueryParams } from '@/services/ApiService/types'
import userService, { TUserRequest } from '../../services/ApiService/User/UserService'
import {
  hasCharactersAttachableDataManager, hasFavouritesAttachableDataManager, hasPinsAttachableDataManager,
  useAttachableDataManager,
  useCharacterableDataManager, useFavouritableDataManager
} from './useAttachableDataManager'

type TAuthUserDataManager = {
  user?: TUser,
  setData: (data: TUser) => any,
  updateData: (data: Partial<TUser>) => any,
  clearData: (id: string | number) => any,
  viewOwn: (query?: TQueryParams) => Promise<TUser>,
  view: (id: string | number, query?: TQueryParams) => Promise<TUser>,
  update: (id: string | number, payload: Partial<TUserRequest>, query?: TQueryParams) => Promise<TUser>,

  // utility
  hasPermission: (permission: TPermission) => boolean
} & hasCharactersAttachableDataManager & hasFavouritesAttachableDataManager & hasPinsAttachableDataManager

/**
 * This is a read only data manager, so we're not
 */
const useAuthUserDataManager = (): TAuthUserDataManager => {

  const slice = authUserSlice;
  const api = userService;

  const dispatch = useAppDispatch()

  const { data: entity } = useAppSelector(state => state.authUser)

  // REDUX MANAGEMENT
  const setData = useCallback((data: TUser) => {
    dispatch(slice.actions.set(data))
  }, [])

  const updateData = useCallback((data: Partial<TUser>) => {
    dispatch(slice.actions.update(data))
  }, [])

  const clearData = useCallback((id: string | number) => {
    dispatch(slice.actions.clear(id))
  }, [])

  const viewOwn = useCallback(async (query: TQueryParams = {}): Promise<TUser> => {
    const { data } = await api.viewOwn(query)
    setData(data.data)
    return data.data
  }, [])

  const view = useCallback(async (id: string | number, query: TQueryParams = {}): Promise<TUser> => {
    const { data } = await api.view(id, query)
    setData(data.data)
    return data.data
  }, [])

  const update = useCallback(async (id: string | number, payload: Partial<TUserRequest>, query: TQueryParams = {}) => {
    const { data } = await api.update(id, payload, query)
    updateData(data.data)
    return data.data
  }, [])

  const hasPermission = (permission: TPermission): boolean => {
    if (!entity?.permissions) {
      return false;
    }
    return entity.permissions.some(value => {
      return value.permission === permission.permission
        && value.permissionableType === permission.permissionableType
        && value.permissionableId === permission.permissionableId
    })
  }

  return {
    user: entity,
    setData,
    updateData,
    clearData,
    view,
    viewOwn,
    update,
    characters: useCharacterableDataManager(authUserSlice, userService.characters),
    favourites: useFavouritableDataManager(authUserSlice, userService.favourites),
    pins: useAttachableDataManager('pins', authUserSlice, userService.pins),
    hasPermission
  }
}

export default useAuthUserDataManager