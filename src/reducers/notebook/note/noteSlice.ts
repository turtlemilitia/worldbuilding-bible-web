import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'

import { TNote } from '../../../types'


interface TState {
  note: Partial<TNote>;
}

const initialState: TState = {
  note: {
    name: '',
    content: '',
  }
}

const noteSlice: Slice<TState> = createSlice({
  name: 'note',
  initialState,
  reducers: {
    setNoteData: (state, action: PayloadAction<TNote>) => {
      state.note = action.payload
    },
    updateNoteData: (state, action: PayloadAction<Partial<TNote>>) => {
      state.note = { ...state.note, ...action.payload }
    },
    clearNoteData: (state) => {
      state.note = initialState.note
    }
  }
})

export const { setNoteData, updateNoteData, clearNoteData } = noteSlice.actions

export default noteSlice.reducer