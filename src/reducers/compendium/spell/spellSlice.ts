import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'

import { TSpell } from '../../../types'


interface TState {
  spell: Partial<TSpell>;
}

const initialState: TState = {
  spell: {
    name: '',
    content: '',
  }
}

const spellSlice: Slice<TState> = createSlice({
  name: 'spell',
  initialState,
  reducers: {
    setSpellData: (state, action: PayloadAction<TSpell>) => {
      state.spell = action.payload
    },
    updateSpellData: (state, action: PayloadAction<Partial<TSpell>>) => {
      state.spell = { ...state.spell, ...action.payload }
    },
    clearSpellData: (state) => {
      state.spell = initialState.spell
    }
  }
})

export const { setSpellData, updateSpellData, clearSpellData } = spellSlice.actions

export default spellSlice.reducer