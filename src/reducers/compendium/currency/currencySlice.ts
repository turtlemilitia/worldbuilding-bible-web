import { TCurrency } from '../../../types'
import createEntitySlice from '../../createEntitySlice'

export const currencySlice = createEntitySlice<TCurrency>('currency')

export default currencySlice.reducer