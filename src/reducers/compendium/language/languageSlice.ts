import { TLanguage } from '../../../types'
import createEntitySlice from '../../createEntitySlice'

export const languageSlice = createEntitySlice<TLanguage>('language')

export default languageSlice.reducer