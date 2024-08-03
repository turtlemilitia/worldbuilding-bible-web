import { TConcept } from '../../../types'
import createEntitySlice from '../../createEntitySlice'

export const conceptSlice = createEntitySlice<TConcept>('concept')

export default conceptSlice.reducer