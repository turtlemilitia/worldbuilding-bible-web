import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'

import { TNotebook } from '../../types'

interface TState {
  notebook: TNotebook;
}

const initialState: TState = {
  notebook: {
    name: '',
    content: '',
    hasNotes: false
  }
}

const notebookSlice: Slice<TState> = createSlice({
  name: 'notebook',
  initialState,
  reducers: {
    setNotebookData: (state, action: PayloadAction<TNotebook>) => {
      state.notebook = action.payload
    },
    updateNotebookData: (state, action: PayloadAction<Partial<TNotebook>>) => {
      state.notebook = { ...state.notebook, ...action.payload }
    },
    clearNotebookData: (state) => {
      state.notebook = initialState.notebook
    }
  }
})

export const { setNotebookData, updateNotebookData, clearNotebookData } = notebookSlice.actions

export default notebookSlice.reducer