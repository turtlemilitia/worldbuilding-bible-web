import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'

import { TCharacter } from '../../../types'


interface TState {
  character: Partial<TCharacter>;
}

const initialState: TState = {
  character: {
    name: '',
    content: '',
  }
}

const characterSlice: Slice<TState> = createSlice({
  name: 'character',
  initialState,
  reducers: {
    setCharacterData: (state, action: PayloadAction<TCharacter>) => {
      state.character = action.payload
    },
    updateCharacterData: (state, action: PayloadAction<Partial<TCharacter>>) => {
      state.character = { ...state.character, ...action.payload }
    },
    clearCharacterData: (state) => {
      state.character = initialState.character
    }
  }
})

export const { setCharacterData, updateCharacterData, clearCharacterData } = characterSlice.actions

export default characterSlice.reducer