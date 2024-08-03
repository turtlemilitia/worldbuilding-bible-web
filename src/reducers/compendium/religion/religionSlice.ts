import { TReligion } from '../../../types'
import createEntitySlice from '../../createEntitySlice'

export const religionSlice = createEntitySlice<TReligion>('religion')

export default religionSlice.reducer