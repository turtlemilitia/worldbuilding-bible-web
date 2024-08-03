import { TStory } from '../../../types'
import createEntitySlice from '../../createEntitySlice'

export const storySlice = createEntitySlice<TStory>('story')

export default storySlice.reducer