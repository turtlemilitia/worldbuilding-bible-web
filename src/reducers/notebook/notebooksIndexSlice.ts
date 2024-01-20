import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'

import { TNote, TNotebook } from '../../types'

interface TState {notebooks: TNotebook[]}

const initialState: TState = {
  notebooks: []
}

const notebooksIndexSlice: Slice<TState> = createSlice({
  name: 'notebooksIndex',
  initialState,
  reducers: {
    setNotebooks: (state, action: PayloadAction<TNotebook[]>) => {
      state.notebooks = [...action.payload]
    },
    addNotebook: (state, action: PayloadAction<TNotebook>) => {
      state.notebooks = [...state.notebooks, action.payload]
    },
    updateNotebooksNotebookData: (state, action: PayloadAction<TNotebook>) => {
      state.notebooks = [ ...state.notebooks.map(notebook => {
        return notebook.id === action.payload.id ? { ...notebook, ...action.payload } : notebook
      }) ]
    },
    addNotebooksNotebookNote: (state, action: PayloadAction<{ slug: TNotebook['slug'], note: TNote }>) => {
      state.notebooks = [ ...state.notebooks.map(notebook => {
        return notebook.slug === action.payload.slug ? { ...notebook, notes: notebook.notes ? [ ...notebook.notes, action.payload.note ] : [ action.payload.note ] } : notebook
      }) ]
    },
    updateNotebooksNotebookNote: (state, action: PayloadAction<{ slug: TNotebook['slug'], note: TNote }>) => {
      state.notebooks = [ ...state.notebooks.map(notebook => {
        return notebook.slug === action.payload.slug ? { ...notebook, notes: notebook.notes?.map(note => note.id === action.payload.note.id ? {...note, ...action.payload.note} : note) } : notebook
      }) ]
    },
    removeNotebooksNotebookNote: (state, action: PayloadAction<{ slug: TNotebook['slug'], noteId: TNote['slug'] }>) => {
      state.notebooks = [ ...state.notebooks.map(notebook => {
        return notebook.slug === action.payload.slug ? { ...notebook, notes: notebook.notes?.filter(note => note.slug !== action.payload.noteId) } : notebook
      }) ]
    },
    removeNotebook: (state, action: PayloadAction<{ id: TNotebook['slug'] }>) => {
      state.notebooks = state.notebooks.filter((notebook: TNotebook) => notebook.slug !== action.payload.id)
    },
    clearNotebooks: (state) => {
      state.notebooks = initialState.notebooks
    }
  }
})

export const {
  setNotebooks,
  addNotebook,
  clearNotebooks,
  updateNotebooksNotebookData,
  addNotebooksNotebookNote,
  updateNotebooksNotebookNote,
  removeNotebooksNotebookNote,
  removeNotebook
} = notebooksIndexSlice.actions

export default notebooksIndexSlice.reducer