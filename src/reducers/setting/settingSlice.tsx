import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'

import { TSetting } from '../../types'


interface TState {
  setting: TSetting;
}

const initialState: TState = {
  setting: {
    name: '',
    content: '',
    hasLocations: false,
  }
}

const settingSlice: Slice<TState> = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setSettingData: (state, action: PayloadAction<TSetting>) => {
      state.setting = action.payload
    },
    updateSettingData: (state, action: PayloadAction<Partial<TSetting>>) => {
      state.setting = { ...state.setting, ...action.payload }
    },
    clearSettingData: (state) => {
      state.setting = initialState.setting
    }
  }
})

export const { setSettingData, updateSettingData, clearSettingData } = settingSlice.actions

export default settingSlice.reducer