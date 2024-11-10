import { TCampaign, TUser } from '@/types'

type TIsPinnedProps = {
  campaign: TCampaign,
  entityName: string
  entityId: number
}
const isPinnedToCampaign = ({campaign, entityName, entityId}: TIsPinnedProps): boolean => {
  return !!campaign?.pins.find(pin => {
    return pin.pinnableType === entityName && pin.pinnable.id === entityId
  })
}
const isPinnedToCampaignUser = ({campaign, entityName, entityId}: TIsPinnedProps): boolean => {
  return !!campaign.users.find((user: TUser): boolean => {
    return !!user.pins?.find(pin => {
      return pin.pinnableType === entityName && pin.pinnable.id ===
        entityId
    })
  })
}
export const isPinned = (props: TIsPinnedProps) => {
  return isPinnedToCampaign(props)
  || isPinnedToCampaignUser(props)
}