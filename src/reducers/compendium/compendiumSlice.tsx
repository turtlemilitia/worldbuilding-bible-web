import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'

import { TCharacter, TCompendium, TConcept, TFaction, TItem, TLanguage, TLocation, TTypesAllowed } from '../../types'
import character from '../../pages/Compendium/Character'

interface TState {
  loading: boolean;
  compendium: TCompendium;
}

const initialState: TState = {
  loading: false,
  compendium: {
    name: '',
    content: '',
    hasLocations: false,
    locations: []
  }
}

type TCompendiumChildActionProps = {
  field: 'characters'|'concepts'|'factions'|'items'|'languages'|'locations'|'species'
  data: TTypesAllowed;
}

const compendiumSlice: Slice<TState> = createSlice({
  name: 'compendium',
  initialState,
  reducers: {
    setCompendiumLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setCompendiumData: (state, action: PayloadAction<TCompendium>) => {
      state.compendium = action.payload
    },
    updateCompendiumData: (state, action: PayloadAction<Partial<TCompendium>>) => {
      state.compendium = { ...state.compendium, ...action.payload }
    },
    addCompendiumChildData: (state, action: PayloadAction<TCompendiumChildActionProps>) => {
      const field = action.payload.field;
      state.compendium = {
        ...state.compendium,
        [`has${field[0].toUpperCase() + field.slice(1)}`]: true,
        [field]: [...(state.compendium[field] || []), action.payload.data]
      }
    },
    updateCompendiumChildData: (state, action: PayloadAction<TCompendiumChildActionProps>) => {
      const field = action.payload.field;
      state.compendium = {
        ...state.compendium,
        [field]: state.compendium[field]?.map(child => child.id === action.payload.data.id ? { ...child, ...action.payload.data } : child)
      }
    },
    clearCompendiumData: (state) => {
      state.compendium = initialState.compendium
    }
  }
})

export const {
  setCompendiumLoading,
  setCompendiumData,
  updateCompendiumData,
  clearCompendiumData,
  addCompendiumChildData,
  updateCompendiumChildData,
} = compendiumSlice.actions

export default compendiumSlice.reducer