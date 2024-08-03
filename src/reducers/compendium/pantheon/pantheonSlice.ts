import { TPantheon } from '../../../types'
import createEntitySlice from '../../createEntitySlice'

export const pantheonSlice = createEntitySlice<TPantheon>('pantheon')

export default pantheonSlice.reducer