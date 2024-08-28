import { useCampaignDataManager } from './DataManagers'
import { TPlayerCharacterHandler } from '../components/Post/types'
import useAuthUserDataManager from './DataManagers/useAuthUserDataManager'
import { useCallback, useMemo } from 'react'
import { TSelectOption } from '../components/Forms/Fields/FieldMapper'
import useUserDataManager from './DataManagers/Campaigns/useUserDataManager'
import { TCharacterDataManager } from './DataManagers/Compendia/useCharacterDataManager'

type TProps = {
  manager: TCharacterDataManager
}
const usePlayerCharacterHandler = ({ manager }: TProps): TPlayerCharacterHandler => {

  const { user: authUser } = useAuthUserDataManager()
  const { campaign, } = useCampaignDataManager()
  const { characters: userCharactersDataManager } = useUserDataManager()

  const handleOnSelectUser = useCallback(async (values: TSelectOption[]) => {
    if (!campaign) {
      return
    }
    if (!manager.entity) {
      return
    }
    const promises: Promise<void>[] = []
    campaign.users.forEach((user) => {
      if (!manager.character) {
        return
      }
      const addToUser = values.some(value => {
        return value.id === user.id
      })
      const addedToUser = user.characters?.find(character => {
        return character.id === manager.character?.id
      })
      if (addToUser && !addedToUser) {
        promises.push(userCharactersDataManager.attach(user.id, { characterId: manager.character.id, }))
      }
      if (!addToUser && addedToUser) {
        promises.push(userCharactersDataManager.detach(user.id, addedToUser.slug))
      }
    })
    return Promise.all(promises)
  }, [campaign, manager.character])

  const values = useMemo(() => {
    const values: TSelectOption[] = []
    campaign?.users.forEach((user) => {
      if (user.characters?.some(character => character.id === manager.character?.id)) {
        values.push({ ...user })
      }
    })
    return values
  }, [campaign?.users, manager.character])

  const permittedUsers = useMemo(() => {
    return campaign?.users.filter((user) => {
      return user.permissions?.some(permission => {
        return permission.permissionableId === manager.entity?.id
      })
    }) ?? []
  }, [campaign])

  const canAssign = useMemo(() => {
    return permittedUsers.length > 0 && authUser?.id === campaign?.gameMaster?.id
  }, [authUser, campaign])

  return {
    handleOnSelectUser,
    values,
    options: permittedUsers,
    canAssign
  }
}

export default usePlayerCharacterHandler