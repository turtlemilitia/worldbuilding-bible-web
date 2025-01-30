import { TUser } from '@/types'
import createEntitySlice from '../createEntitySlice'

export const authUserSlice = createEntitySlice<TUser>('authUser')

export default authUserSlice.reducer