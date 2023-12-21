import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'

import { TPantheon } from '../../../types'


interface TState {
  pantheon: Partial<TPantheon>;
}

const initialState: TState = {
  pantheon: {
    name: '',
    content: '',
  }
}

const pantheonSlice: Slice<TState> = createSlice({
  name: 'pantheon',
  initialState,
  reducers: {
    setPantheonData: (state, action: PayloadAction<TPantheon>) => {
      state.pantheon = action.payload
    },
    updatePantheonData: (state, action: PayloadAction<Partial<TPantheon>>) => {
      state.pantheon = { ...state.pantheon, ...action.payload }
    },
    clearPantheonData: (state) => {
      state.pantheon = initialState.pantheon
    }
  }
})

export const { setPantheonData, updatePantheonData, clearPantheonData } = pantheonSlice.actions

export default pantheonSlice.reducer