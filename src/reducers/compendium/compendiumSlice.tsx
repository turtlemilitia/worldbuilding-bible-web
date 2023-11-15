import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'

import { TCompendium, TLocation } from '../../types'

interface TState {
  compendium: TCompendium;
}

const initialState: TState = {
  compendium: {
    name: '',
    content: '',
    hasLocations: false,
    locations: []
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
    addCompendiumLocationData: (state, action: PayloadAction<TLocation>) => {
      state.compendium = {
        ...state.compendium,
        hasLocations: true,
        locations: [...(state.compendium.locations || []), action.payload]
      }
    },
    updateCompendiumLocationData: (state, action: PayloadAction<TLocation>) => {
      state.compendium = {
        ...state.compendium,
        locations: state.compendium.locations?.map(location => location.id === action.payload.id ? { ...location, ...action.payload } : location)
      }
    },
    clearCompendiumData: (state) => {
      state.compendium = initialState.compendium
    }
  }
})

export const {
  setCompendiumData,
  updateCompendiumData,
  clearCompendiumData,
  addCompendiumLocationData,
  updateCompendiumLocationData
} = compendiumSlice.actions

export default compendiumSlice.reducer