import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'

import { TLanguage } from '../../../types'


interface TState {
  language?: TLanguage;
}

const initialState: TState = {
}

const languageSlice: Slice<TState> = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguageData: (state, action: PayloadAction<TLanguage>) => {
      state.language = action.payload
    },
    updateLanguageData: (state, action: PayloadAction<Partial<TLanguage>>) => {
      state.language = { ...state.language as TLanguage, ...action.payload }
    },
    clearLanguageData: (state) => {
      state.language = initialState.language
    }
  }
})

export const { setLanguageData, updateLanguageData, clearLanguageData } = languageSlice.actions

export default languageSlice.reducer