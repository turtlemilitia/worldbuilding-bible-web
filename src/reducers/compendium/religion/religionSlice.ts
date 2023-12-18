import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'

import { TReligion } from '../../../types'


interface TState {
  religion: Partial<TReligion>;
}

const initialState: TState = {
  religion: {
    name: '',
    content: '',
  }
}

const religionSlice: Slice<TState> = createSlice({
  name: 'religion',
  initialState,
  reducers: {
    setReligionData: (state, action: PayloadAction<TReligion>) => {
      state.religion = action.payload
    },
    updateReligionData: (state, action: PayloadAction<Partial<TReligion>>) => {
      state.religion = { ...state.religion, ...action.payload }
    },
    clearReligionData: (state) => {
      state.religion = initialState.religion
    }
  }
})

export const { setReligionData, updateReligionData, clearReligionData } = religionSlice.actions

export default religionSlice.reducer