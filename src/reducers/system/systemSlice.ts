import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface SystemState {
  slug?: string;
  name: string;
  description: string
}

const initialState: SystemState = {
  name: '',
  description: '',
}

const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<SystemState>) => {
      state = action.payload
    },
    updateData: (state, action: PayloadAction<Partial<SystemState>>) => {
      state = { ...state, ...action.payload }
    },
    clearData: (state, action: PayloadAction<Partial<SystemState>>) => {
      state = initialState
    }
  }
})

export const { setData, updateData, clearData } = systemSlice.actions

export default systemSlice.reducer