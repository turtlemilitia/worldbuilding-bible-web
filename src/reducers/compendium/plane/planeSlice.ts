import { TPlane } from '../../../types'
import createEntitySlice from '../../createEntitySlice'

export const planeSlice = createEntitySlice<TPlane>('plane')

export default planeSlice.reducer