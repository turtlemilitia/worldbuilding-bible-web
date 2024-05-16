import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'

import { TFaction } from '../../../types'


interface TState {
  faction?: TFaction;
}

const initialState: TState = {
}

const factionSlice: Slice<TState> = createSlice({
  name: 'faction',
  initialState,
  reducers: {
    setFactionData: (state, action: PayloadAction<TFaction>) => {
      state.faction = action.payload
    },
    updateFactionData: (state, action: PayloadAction<Partial<TFaction>>) => {
      state.faction = { ...state.faction as TFaction, ...action.payload }
    },
    clearFactionData: (state) => {
      state.faction = initialState.faction
    }
  }
})

export const { setFactionData, updateFactionData, clearFactionData } = factionSlice.actions

export default factionSlice.reducer