import { TEncounter } from '../../../types'
import createEntitySlice from '../../createEntitySlice'

export const encounterSlice = createEntitySlice<TEncounter>('encounter')

export default encounterSlice.reducer