import { TNotebook } from '../../types'
import createIndexSlice from '../createIndexSlice'

export const notebooksIndexSlice = createIndexSlice<TNotebook>('notebooksIndex')

export default notebooksIndexSlice.reducer