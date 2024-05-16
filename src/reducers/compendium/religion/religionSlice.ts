import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'

import { TReligion } from '../../../types'


interface TState {
  religion?: TReligion;
}

const initialState: TState = {
}

const religionSlice: Slice<TState> = createSlice({
  name: 'religion',
  initialState,
  reducers: {
    setReligionData: (state, action: PayloadAction<TReligion>) => {
      state.religion = action.payload
    },
    updateReligionData: (state, action: PayloadAction<Partial<TReligion>>) => {
      state.religion = { ...state.religion as TReligion, ...action.payload }
    },
    clearReligionData: (state) => {
      state.religion = initialState.religion
    }
  }
})

export const { setReligionData, updateReligionData, clearReligionData } = religionSlice.actions

export default religionSlice.reducer