import { TQuest } from '../../../types'
import createEntitySlice from '../../createEntitySlice'

export const questSlice = createEntitySlice<TQuest>('quest')

export default questSlice.reducer