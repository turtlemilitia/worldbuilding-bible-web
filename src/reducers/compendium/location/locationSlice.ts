import { TLocation } from '../../../types'
import createEntitySlice from '../../createEntitySlice'

export const locationSlice = createEntitySlice<TLocation>('location')

export default locationSlice.reducer