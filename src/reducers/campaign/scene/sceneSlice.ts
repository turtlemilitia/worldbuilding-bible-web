import { TScene } from '../../../types'
import createEntitySlice from '../../createEntitySlice'

export const sceneSlice = createEntitySlice<TScene>('scene')

export default sceneSlice.reducer