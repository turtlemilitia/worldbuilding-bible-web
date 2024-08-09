import { TSpecies } from '../../../types'
import createEntitySlice from '../../createEntitySlice'

export const speciesSlice = createEntitySlice<TSpecies>('species')

export default speciesSlice.reducer