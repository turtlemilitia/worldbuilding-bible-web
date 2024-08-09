import { TNotebook } from '../../types'
import createEntitySlice from '../createEntitySlice'

export const notebookSlice = createEntitySlice<TNotebook>('notebook')

export default notebookSlice.reducer