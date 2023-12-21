import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'

import { TQuest } from '../../../types'


interface TState {
  quest: Partial<TQuest>;
}

const initialState: TState = {
  quest: {
    name: '',
    content: '',
  }
}

const questSlice: Slice<TState> = createSlice({
  name: 'quest',
  initialState,
  reducers: {
    setQuestData: (state, action: PayloadAction<TQuest>) => {
      state.quest = action.payload
    },
    updateQuestData: (state, action: PayloadAction<Partial<TQuest>>) => {
      state.quest = { ...state.quest, ...action.payload }
    },
    clearQuestData: (state) => {
      state.quest = initialState.quest
    }
  }
})

export const { setQuestData, updateQuestData, clearQuestData } = questSlice.actions

export default questSlice.reducer