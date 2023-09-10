import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'

import { TLanguage } from '../../../types'


interface TState {
  language: Partial<TLanguage>;
}

const initialState: TState = {
  language: {
    name: '',
    content: '',
  }
}

const languageSlice: Slice<TState> = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguageData: (state, action: PayloadAction<TLanguage>) => {
      state.language = action.payload
    },
    updateLanguageData: (state, action: PayloadAction<Partial<TLanguage>>) => {
      state.language = { ...state.language, ...action.payload }
    },
    clearLanguageData: (state) => {
      state.language = initialState.language
    }
  }
})

export const { setLanguageData, updateLanguageData, clearLanguageData } = languageSlice.actions

export default languageSlice.reducer