import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'

import { TStory } from '../../../types'


interface TState {
  story?: TStory;
}

const initialState: TState = {
}

const storySlice: Slice<TState> = createSlice({
  name: 'story',
  initialState,
  reducers: {
    setStoryData: (state, action: PayloadAction<TStory>) => {
      state.story = action.payload
    },
    updateStoryData: (state, action: PayloadAction<Partial<TStory>>) => {
      state.story = { ...state.story as TStory, ...action.payload }
    },
    clearStoryData: (state) => {
      state.story = initialState.story
    }
  }
})

export const { setStoryData, updateStoryData, clearStoryData } = storySlice.actions

export default storySlice.reducer