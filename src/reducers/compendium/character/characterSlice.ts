import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'

import { TCharacter, TNote } from '../../../types'


interface TState {
  character?: TCharacter;
}

const initialState: TState = {
}

const characterSlice: Slice<TState> = createSlice({
  name: 'character',
  initialState,
  reducers: {
    setCharacterData: (state, action: PayloadAction<TCharacter>) => {
      state.character = action.payload
    },
    updateCharacterData: (state, action: PayloadAction<Partial<TCharacter>>) => {
      state.character = { ...state.character as TCharacter, ...action.payload }
    },
    addCharacterNote: (state, action: PayloadAction<TNote>) => {
      state.character = { ...state.character as TCharacter, notes: [ ...(state.character?.notes ?? []), action.payload ] }
    },
    updateCharacterNote: (state, action: PayloadAction<TNote>) => {
      state.character = { ...state.character as TCharacter, notes: (state.character?.notes ?? []).map((note) => note.id === action.payload.id ? action.payload : note) }
    }
  }
})

export const { setCharacterData, updateCharacterData, addCharacterNote, updateCharacterNote } = characterSlice.actions

export default characterSlice.reducer