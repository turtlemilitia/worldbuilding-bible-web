import { TImageType } from '../../types'
import createIndexSlice from '../createIndexSlice'

export const imageTypesIndexSlice = createIndexSlice<TImageType>('imageTypesIndex')

export default imageTypesIndexSlice.reducer