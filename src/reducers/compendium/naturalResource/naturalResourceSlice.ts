import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'

import { TNaturalResource } from '../../../types'


interface TState {
  naturalResource?: TNaturalResource;
}

const initialState: TState = {
}

const naturalResourceSlice: Slice<TState> = createSlice({
  name: 'naturalResource',
  initialState,
  reducers: {
    setNaturalResourceData: (state, action: PayloadAction<TNaturalResource>) => {
      state.naturalResource = action.payload
    },
    updateNaturalResourceData: (state, action: PayloadAction<Partial<TNaturalResource>>) => {
      state.naturalResource = { ...state.naturalResource as TNaturalResource, ...action.payload }
    },
    clearNaturalResourceData: (state) => {
      state.naturalResource = initialState.naturalResource
    }
  }
})

export const { setNaturalResourceData, updateNaturalResourceData, clearNaturalResourceData } = naturalResourceSlice.actions

export default naturalResourceSlice.reducer