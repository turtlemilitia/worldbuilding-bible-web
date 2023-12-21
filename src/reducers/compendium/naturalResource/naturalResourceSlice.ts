import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'

import { TNaturalResource } from '../../../types'


interface TState {
  naturalResource: Partial<TNaturalResource>;
}

const initialState: TState = {
  naturalResource: {
    name: '',
    content: '',
  }
}

const naturalResourceSlice: Slice<TState> = createSlice({
  name: 'naturalResource',
  initialState,
  reducers: {
    setNaturalResourceData: (state, action: PayloadAction<TNaturalResource>) => {
      state.naturalResource = action.payload
    },
    updateNaturalResourceData: (state, action: PayloadAction<Partial<TNaturalResource>>) => {
      state.naturalResource = { ...state.naturalResource, ...action.payload }
    },
    clearNaturalResourceData: (state) => {
      state.naturalResource = initialState.naturalResource
    }
  }
})

export const { setNaturalResourceData, updateNaturalResourceData, clearNaturalResourceData } = naturalResourceSlice.actions

export default naturalResourceSlice.reducer