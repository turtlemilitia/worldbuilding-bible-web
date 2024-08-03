import { TSession } from '../../../types'
import createEntitySlice from '../../createEntitySlice'

export const sessionSlice = createEntitySlice<TSession>('session')

export default sessionSlice.reducer