import { TSystem } from '../../types'
import createIndexSlice from '../createIndexSlice'

export const systemsIndexSlice = createIndexSlice<TSystem>('systemsIndex')

export default systemsIndexSlice.reducer