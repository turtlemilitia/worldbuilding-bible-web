import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'

import { TEncounter } from '../../../types'


interface TState {
  encounter: Partial<TEncounter>;
}

const initialState: TState = {
  encounter: {
    name: '',
    content: '',
  }
}

const encounterSlice: Slice<TState> = createSlice({
  name: 'encounter',
  initialState,
  reducers: {
    setEncounterData: (state, action: PayloadAction<TEncounter>) => {
      state.encounter = action.payload
    },
    updateEncounterData: (state, action: PayloadAction<Partial<TEncounter>>) => {
      state.encounter = { ...state.encounter, ...action.payload }
    },
    clearEncounterData: (state) => {
      state.encounter = initialState.encounter
    }
  }
})

export const { setEncounterData, updateEncounterData, clearEncounterData } = encounterSlice.actions

export default encounterSlice.reducer