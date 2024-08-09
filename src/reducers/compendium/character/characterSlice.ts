import { TCharacter } from '../../../types'
import createEntitySlice from '../../createEntitySlice'

export const characterSlice = createEntitySlice<TCharacter>('character')

export default characterSlice.reducer