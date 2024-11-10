import { TCampaign, TUser } from '@/types'

type TIsPublicProps = {
  campaign: TCampaign,
  entityName: string
  entityId: number
}
const IsPublicToCampaign = ({campaign, entityName, entityId}: TIsPublicProps): boolean => {
  return !!campaign?.permissions.find(permission => {
    return permission.permissionableType === entityName && permission.permissionableId === entityId
  })
}
const IsPublicToCampaignUser = ({campaign, entityName, entityId}: TIsPublicProps): boolean => {
  return !!campaign.users.find((user: TUser): boolean => {
    return !!user.permissions?.find(permission => {
      return permission.permissionableType === entityName &&
        permission.permissionableId === entityId
    })
  })
}
export const IsPublic = (props: TIsPublicProps) => {
  return IsPublicToCampaign(props)
  || IsPublicToCampaignUser(props)
}