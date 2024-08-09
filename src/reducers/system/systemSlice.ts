import { TSystem } from '../../types'
import createEntitySlice from '../createEntitySlice'

export const systemSlice = createEntitySlice<TSystem>('system')

export default systemSlice.reducer