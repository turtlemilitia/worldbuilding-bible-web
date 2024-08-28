import { TPermission } from '../../types'
import { createAttachableService, TAttachableApi } from './createAttachableService'

export interface TPermissionAttachRequest {
  permissionableType: string,
  permission: 'view',
  permissionableId: number,
}

export type TPermissionAttachResponse = TPermission

export type TPermissionableApi = { permissions: TAttachableApi<TPermissionAttachRequest, TPermissionAttachResponse> }

export const createPermissionableService = (parentPluralName: 'users' | 'campaigns'): TPermissionableApi => ({
  permissions: createAttachableService<TPermissionAttachRequest, TPermissionAttachResponse>(null, parentPluralName, 'permissions')
})