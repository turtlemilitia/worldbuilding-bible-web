import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'

import { TPlane } from '../../../types'


interface TState {
  plane?: TPlane;
}

const initialState: TState = {
}

const planeSlice: Slice<TState> = createSlice({
  name: 'plane',
  initialState,
  reducers: {
    setPlaneData: (state, action: PayloadAction<TPlane>) => {
      state.plane = action.payload
    },
    updatePlaneData: (state, action: PayloadAction<Partial<TPlane>>) => {
      state.plane = { ...state.plane as TPlane, ...action.payload }
    },
    clearPlaneData: (state) => {
      state.plane = initialState.plane
    }
  }
})

export const { setPlaneData, updatePlaneData, clearPlaneData } = planeSlice.actions

export default planeSlice.reducer