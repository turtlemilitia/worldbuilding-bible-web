import { TDataManager, useCampaignDataManager } from './DataManagers'
import { TPinForOption, TPinHandler } from '@/components/Post/types'
import useAuthUserDataManager from './DataManagers/useAuthUserDataManager'
import { useCallback, useMemo } from 'react'
import { TSelectOption } from '@/components/Forms/Fields/FieldMapper'
import { TGenericPostBasic } from '@/types'
import useUserDataManager from './DataManagers/Campaigns/useUserDataManager'

type TProps<TEntity> = {
  manager: TDataManager<TEntity, any>
}
const usePinHandler = <T extends TGenericPostBasic> ({ manager }: TProps<T>): TPinHandler => {

  const { user: authUser } = useAuthUserDataManager()
  const { campaign, pins: campaignPinsDataManager, } = useCampaignDataManager()
  const { pins: userPinsDataManager } = useUserDataManager()

  const handleOnPinSelected = useCallback(async (values: (TSelectOption & { type: 'campaign' | 'user' })[]) => {
    if (!campaign) {
      return
    }
    if (!manager.entity) {
      return
    }
    const pinToCampaign = values.some(value => {
      return value.type === 'campaign' && value.id === campaign.id
    })
    const pinnedToCampaign = campaign?.pins.find(pin => {
      return pin.pinnableType === manager.entityName && pin.pinnable.id === manager.entity?.id
    })
    if (pinToCampaign && !pinnedToCampaign) {
      campaignPinsDataManager.attach(campaign.slug, {
        pinnableId: manager.entity.id,
        pinnableType: manager.entityName
      })
    } else if (!pinToCampaign && pinnedToCampaign) {
      campaignPinsDataManager.detach(campaign.slug, pinnedToCampaign.id)
    }
    if (pinToCampaign) {
      return
    }
    const promises: Promise<void>[] = []
    campaign.users.forEach((user) => {
      if (!manager.entity) {
        return
      }
      const pinToUser = values.some(value => {
        return value.id === user.id
      })
      const pinnedToUser = user.pins?.find(pin => {
        return pin.pinnableType === manager.entityName && pin.pinnable.id === manager.entity?.id
      })
      if (pinToUser && !pinnedToUser) {
        promises.push(userPinsDataManager.attach(user.id, {
          pinnableId: manager.entity.id,
          pinnableType: manager.entityName
        }))
      }
      if (!pinToUser && pinnedToUser) {
        promises.push(userPinsDataManager.detach(user.id, pinnedToUser.id))
      }
    })
    return Promise.all(promises)
  }, [campaign, manager.entity, manager.entityName])

  const values: TPinForOption[] = useMemo(() => {
    const values: TPinForOption[] = []
    if (campaign?.pins && campaign.pins.some(pin => pin.pinnableType === manager.entityName && pin.pinnable.id === manager.entity?.id)) {
      values.push({ ...campaign, type: 'campaign' })
    }
    campaign?.users.forEach((user) => {
      if (user.pins?.some(pin => pin.pinnableType === manager.entityName && pin.pinnable.id === manager.entity?.id)) {
        values.push({ ...user, type: 'user' })
      }
    })
    return values
  }, [campaign, manager.entity?.id, manager.entityName])

  const permittedUsers = useMemo(() => {
    if (!campaign?.users) {
      return []
    }
    if (campaign.permissions.some(permission => permission.permissionableId === manager.entity?.id)) {
      return campaign.users;
    }
    return campaign?.users.filter((user) => {
      return user.permissions?.some(permission => {
        return permission.permissionableId === manager.entity?.id
      })
    }) ?? []
  }, [campaign?.users])

  const options: TPinForOption[] = useMemo(() => {
    if (!campaign) {
      return []
    }
    const users: TPinForOption[] = permittedUsers.map((user) => ({
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
  }, [campaign, values, permittedUsers])

  const canPin = useMemo(() => {
    return (campaign || permittedUsers?.length > 0) && authUser?.id === campaign?.gameMaster?.id
  }, [authUser, campaign, permittedUsers])

  return {
    canPin,
    handleOnPinSelected,
    options,
    values,
  }
}

export default usePinHandler