import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface SystemState {
  slug?: string;
  name?: string;
  description?: string
}

const initialState: SystemState = {}

const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    createData: (state, action: PayloadAction<SystemState>) => {
      state = action.payload
    },
    updateData: (state, action: PayloadAction<SystemState>) => {
      state = { ...state, ...action.payload }
    },
    removeData: (state, action: PayloadAction<SystemState>) => {
      state = {}
    }
  }
})

export const { createData, updateData, removeData } = systemSlice.actions

export default systemSlice.reducer