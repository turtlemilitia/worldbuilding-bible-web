import { TDataManager, useCampaignDataManager } from './DataManagers'
import { TPermissionHandler, TPermissionForOption } from '@/components/Post/types'
import useAuthUserDataManager from './DataManagers/useAuthUserDataManager'
import { useCallback, useMemo } from 'react'
import { TSelectOption } from '@/components/Forms/Fields/FieldMapper'
import useUserDataManager from './DataManagers/Campaigns/useUserDataManager'
import { hasPermissionsAttachableDataManager } from './DataManagers/useAttachableDataManager'
import { TGenericPostBasic } from '@/types'
import { useCurrentCampaign } from '@/hooks/useCurrentCampaign'

type TProps<TEntity> = {
  manager: TDataManager<TEntity, any> & Partial<hasPermissionsAttachableDataManager>
}
const useUserPermissionHandler = <T extends TGenericPostBasic> ({ manager }: TProps<T>): TPermissionHandler => {

  const { user: authUser } = useAuthUserDataManager()
  const { campaign, permissions: campaignPermissionsDataManager, } = useCurrentCampaign()
  const { permissions: userPermissionsDataManager } = useUserDataManager(campaign?.id)

  const handleOnPermissionSelected = useCallback(async (values: (TSelectOption & { type: 'campaign' | 'user' })[]) => {
    if (!campaign) {
      return
    }
    if (!manager.entity) {
      return
    }
    const promises: Promise<void>[] = []
    const addPermissionToCampaign = values.some(value => {
      return value.type === 'campaign' && value.id === campaign.id
    })
    const permissionAddedToCampaign = campaign?.permissions?.find(permission => {
      return permission.permissionableType === manager.entityName && permission.permissionableId === manager.entity?.id
    })
    if (addPermissionToCampaign && !permissionAddedToCampaign) {
      promises.push(campaignPermissionsDataManager.attach(campaign.slug, {
        permissionableId: manager.entity.id,
        permission: 'view',
        permissionableType: manager.entityName
      }))
    } else if (!addPermissionToCampaign && permissionAddedToCampaign) {
      promises.push(campaignPermissionsDataManager.detach(campaign.slug, permissionAddedToCampaign.id))
    }
    if (!addPermissionToCampaign) {
      campaign.users?.forEach((user) => {
        if (!manager.entity) {
          return
        }
        const permissionToUser = values.some(value => {
          return value.id === user.id
        })
        const permissionedToUser = user.permissions?.find(permission => {
          return permission.permissionableType === manager.entityName &&
            permission.permissionableId === manager.entity?.id
        })
        if (permissionToUser && !permissionedToUser) {
          promises.push(userPermissionsDataManager.attach(user.id, {
            permissionableId: manager.entity.id,
            permission: 'view',
            permissionableType: manager.entityName
          }))
        }
        if (!permissionToUser && permissionedToUser) {
          promises.push(
            userPermissionsDataManager.detach(user.id, permissionedToUser.id))
        }
      })
    }
    return Promise.all(promises)
  }, [campaign, manager.entity, manager.entityName])

  const values = useMemo(() => {
    const values: TPermissionForOption[] = []
    if (campaign?.permissions && campaign.permissions.some(permission => permission.permissionableType === manager.entityName && permission.permissionableId === manager.entity?.id)) {
      values.push({ ...campaign, type: 'campaign' })
    }
    campaign?.users?.forEach((user) => {
      if (user.permissions?.some(permission => permission.permissionableType === manager.entityName && permission.permissionableId === manager.entity?.id)) {
        values.push({ ...user, type: 'user' })
      }
    })
    return values
  }, [campaign, manager.entity, manager.entityName])

  const options: TPermissionForOption[] = useMemo(() => {
    if (!campaign) {
      return []
    }
    const users: TPermissionForOption[] = campaign.users?.map((user) => ({
      id: user.id,
      name: user.name,
      type: 'user',
      disabled: values.some(value => value.type === 'campaign')
    })) ?? []
    return [
      {
        id: campaign.id,
        name: campaign.name,
        type: 'campaign'
      },
      ...users
    ]
  }, [campaign, values])

  const canAssign = useMemo(() => {
    return !!manager.entity?.id && authUser?.id === campaign?.gameMaster?.id
  }, [manager.entity, authUser, campaign])

  return {
    canAssign,
    handleOnPermissionSelected,
    values,
    options,
  }
}

export default useUserPermissionHandler