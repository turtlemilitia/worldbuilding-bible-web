import { TCompendium } from '../../types'
import createEntitySlice from '../createEntitySlice'

export const compendiumSlice = createEntitySlice<TCompendium>('compendium')

export default compendiumSlice.reducer