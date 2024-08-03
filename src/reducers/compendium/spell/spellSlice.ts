import { TSpell } from '../../../types'
import createEntitySlice from '../../createEntitySlice'

export const spellSlice = createEntitySlice<TSpell>('spell')

export default spellSlice.reducer