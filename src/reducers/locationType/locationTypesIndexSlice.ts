import { TLocationType } from '../../types'
import createIndexSlice from '../createIndexSlice'

export const locationTypesIndexSlice = createIndexSlice<TLocationType>('locationTypesIndex')

export default locationTypesIndexSlice.reducer