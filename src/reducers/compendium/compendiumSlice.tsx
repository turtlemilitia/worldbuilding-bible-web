import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'

import { TCompendium } from '../../types'


interface TState {
  compendium: TCompendium;
}

const initialState: TState = {
  compendium: {
    name: '',
    content: '',
    hasLocations: false,
  }
}

const compendiumSlice: Slice<TState> = createSlice({
  name: 'compendium',
  initialState,
  reducers: {
    setCompendiumData: (state, action: PayloadAction<TCompendium>) => {
      state.compendium = action.payload
    },
    updateCompendiumData: (state, action: PayloadAction<Partial<TCompendium>>) => {
      state.compendium = { ...state.compendium, ...action.payload }
    },
    clearCompendiumData: (state) => {
      state.compendium = initialState.compendium
    }
  }
})

export const { setCompendiumData, updateCompendiumData, clearCompendiumData } = compendiumSlice.actions

export default compendiumSlice.reducer