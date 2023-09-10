import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'

import { TSpecies } from '../../../types'


interface TState {
  species: Partial<TSpecies>;
}

const initialState: TState = {
  species: {
    name: '',
    content: '',
  }
}

const speciesSlice: Slice<TState> = createSlice({
  name: 'species',
  initialState,
  reducers: {
    setSpeciesData: (state, action: PayloadAction<TSpecies>) => {
      state.species = action.payload
    },
    updateSpeciesData: (state, action: PayloadAction<Partial<TSpecies>>) => {
      state.species = { ...state.species, ...action.payload }
    },
    clearSpeciesData: (state) => {
      state.species = initialState.species
    }
  }
})

export const { setSpeciesData, updateSpeciesData, clearSpeciesData } = speciesSlice.actions

export default speciesSlice.reducer