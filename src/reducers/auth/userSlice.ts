import { TUser } from '@/types'
import createEntitySlice from '../createEntitySlice'

export const userSlice = createEntitySlice<TUser>('user')

export default userSlice.reducer