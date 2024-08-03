import { TFaction } from '../../../types'
import createEntitySlice from '../../createEntitySlice'

export const factionSlice = createEntitySlice<TFaction>('faction')

export default factionSlice.reducer