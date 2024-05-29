import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'

import { TLocation } from '../../../types'


interface TState {
  location?: TLocation;
}

const initialState: TState = {
}

const locationSlice: Slice<TState> = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocationData: (state, action: PayloadAction<TLocation>) => {
      state.location = action.payload
    },
    updateLocationData: (state, action: PayloadAction<Partial<TLocation>>) => {
      state.location = { ...state.location as TLocation, ...action.payload }
    },
    clearLocationData: (state) => {
      state.location = initialState.location
    }
  }
})

export const { setLocationData, updateLocationData, clearLocationData } = locationSlice.actions

export default locationSlice.reducer