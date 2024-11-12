import { TNote } from '@/types'
import createEntitySlice from '../createEntitySlice'

export const noteSlice = createEntitySlice<TNote>('note')

export default noteSlice.reducer