import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'

import { TSetting } from '../../types'

interface TState {settings: TSetting[]}

const initialState: TState = {
  settings: []
}

const settingsIndexSlice: Slice<TState> = createSlice({
  name: 'settingsIndex',
  initialState,
  reducers: {
    setSettings: (state, action: PayloadAction<TSetting[]>) => {
      state.settings = [...action.payload]
    },
    addSetting: (state, action: PayloadAction<TSetting>) => {
      state.settings = [...state.settings, action.payload]
    },
    removeSetting: (state, action: PayloadAction<TSetting>) => {
      state.settings = state.settings.filter((setting: TSetting) => setting.id !== action.payload.id)
    },
    clearSettings: (state) => {
      state.settings = initialState.settings
    }
  }
})

export const { setSettings, clearSettings } = settingsIndexSlice.actions

export default settingsIndexSlice.reducer