import { TNote } from '@/types'
import createIndexSlice from '../createIndexSlice'

export const notesIndexSlice = createIndexSlice<TNote>('notesIndex')

export default notesIndexSlice.reducer