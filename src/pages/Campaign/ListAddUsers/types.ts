import { TInvitation, TUser } from '../../../types'

export type TListAddUsersProps = {
  users: TUser[];
  invitations: TInvitation[],
  onSubmit: (email: string) => Promise<any>
}