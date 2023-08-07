import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'

import { TLocation } from '../../../types'


interface TState {
  location: Partial<TLocation>;
}

const initialState: TState = {
  location: {
    name: '',
    content: '',
    hasSubLocations: false,
  }
}

const locationSlice: Slice<TState> = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocationData: (state, action: PayloadAction<TLocation>) => {
      state.location = action.payload
    },
    updateLocationData: (state, action: PayloadAction<Partial<TLocation>>) => {
      state.location = { ...state.location, ...action.payload }
    },
    clearLocationData: (state) => {
      state.location = initialState.location
    }
  }
})

export const { setLocationData, updateLocationData, clearLocationData } = locationSlice.actions

export default locationSlice.reducer