import { Identifiable } from '@/types'

export type TPermission = Identifiable & {
  permissionableId: number;
  permission: 'view'|'create',
  permissionableType: string
}