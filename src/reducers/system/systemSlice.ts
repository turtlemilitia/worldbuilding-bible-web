import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'

import { TSystem } from '../../types'


const initialState: TSystem = {
  name: '',
  description: '',
}

const systemSlice: Slice<TSystem> = createSlice({
  name: 'system',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<TSystem>) => {
      state = action.payload
    },
    updateData: (state, action: PayloadAction<Partial<TSystem>>) => {
      state = { ...state, ...action.payload }
    },
    clearData: (state, action: PayloadAction<Partial<TSystem>>) => {
      state = initialState
    }
  }
})

export const { setData, updateData, clearData } = systemSlice.actions

export default systemSlice.reducer