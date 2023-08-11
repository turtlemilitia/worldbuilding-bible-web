import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'

import { TCompendium } from '../../types'

interface TState {compendia: TCompendium[]}

const initialState: TState = {
  compendia: []
}

const compendiaIndexSlice: Slice<TState> = createSlice({
  name: 'compendiaIndex',
  initialState,
  reducers: {
    setCompendia: (state, action: PayloadAction<TCompendium[]>) => {
      state.compendia = [...action.payload]
    },
    addCompendium: (state, action: PayloadAction<TCompendium>) => {
      state.compendia = [...state.compendia, action.payload]
    },
    removeCompendium: (state, action: PayloadAction<TCompendium>) => {
      state.compendia = state.compendia.filter((compendium: TCompendium) => compendium.id !== action.payload.id)
    },
    clearCompendia: (state) => {
      state.compendia = initialState.compendia
    }
  }
})

export const { setCompendia, addCompendium, clearCompendia } = compendiaIndexSlice.actions

export default compendiaIndexSlice.reducer