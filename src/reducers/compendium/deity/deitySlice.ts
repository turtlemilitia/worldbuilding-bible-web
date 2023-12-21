import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'

import { TDeity } from '../../../types'


interface TState {
  deity: Partial<TDeity>;
}

const initialState: TState = {
  deity: {
    name: '',
    content: '',
  }
}

const deitySlice: Slice<TState> = createSlice({
  name: 'deity',
  initialState,
  reducers: {
    setDeityData: (state, action: PayloadAction<TDeity>) => {
      state.deity = action.payload
    },
    updateDeityData: (state, action: PayloadAction<Partial<TDeity>>) => {
      state.deity = { ...state.deity, ...action.payload }
    },
    clearDeityData: (state) => {
      state.deity = initialState.deity
    }
  }
})

export const { setDeityData, updateDeityData, clearDeityData } = deitySlice.actions

export default deitySlice.reducer