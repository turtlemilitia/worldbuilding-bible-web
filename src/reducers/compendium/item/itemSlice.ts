import { TItem } from '../../../types'
import createEntitySlice from '../../createEntitySlice'

export const itemSlice = createEntitySlice<TItem>('item')

export default itemSlice.reducer