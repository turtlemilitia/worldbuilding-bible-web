import { Identifiable, Named } from '@/types/Generic'
import { TCharacter, TFavourite, TPermission, TPin } from '@/types'

export type TUser = Identifiable & Named & {
  email: string;
  pins?: TPin[];
  favourites?: TFavourite[];
  characters?: TCharacter[];
  permissions?: TPermission[];
  canViewSystems: boolean;
  canCreateCompendia: boolean;
  canCreateCampaigns: boolean;
}