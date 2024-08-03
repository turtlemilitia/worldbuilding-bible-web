import { TDeity } from '../../../types'
import createEntitySlice from '../../createEntitySlice'

export const deitySlice = createEntitySlice<TDeity>('deity')

export default deitySlice.reducer