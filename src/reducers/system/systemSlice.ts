import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'

import { TSystem } from '../../types'


interface TState {
  system?: TSystem;
}

const initialState: TState = {
}

const systemSlice: Slice<TState> = createSlice({
  name: 'system',
  initialState,
  reducers: {
    setSystemData: (state, action: PayloadAction<TSystem>) => {
      state.system = action.payload
    },
    updateSystemData: (state, action: PayloadAction<TSystem>) => {
      state.system = { ...state.system, ...action.payload }
    },
    clearSystemData: (state) => {
      state.system = initialState.system
    }
  }
})

export const { setSystemData, updateSystemData, clearSystemData } = systemSlice.actions

export default systemSlice.reducer