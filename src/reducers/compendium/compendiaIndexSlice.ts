import createIndexSlice from '../createIndexSlice'
import { TCompendium } from '../../types'

export const compendiaIndexSlice = createIndexSlice<TCompendium>('compendiaIndex')

export default compendiaIndexSlice.reducer