import { TDataManager, useCampaignDataManager } from './DataManagers'
import { TPinForOption, TPinHandler } from '../components/Post/types'
import useAuthUserDataManager from './DataManagers/useAuthUserDataManager'
import { useCallback, useMemo } from 'react'
import { TSelectOption } from '../components/Forms/Fields/FieldMapper'
import { TGenericPostBasic } from '../types'
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

  const values = useMemo(() => {
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
  }, [campaign, manager.entity, manager.entityName])

  const canPin = useMemo(() => {
    return authUser?.id === campaign?.gameMaster?.id
  }, [authUser, campaign])

  return {
    canPin,
    handleOnPinSelected,
    values
  }
}

export default usePinHandler