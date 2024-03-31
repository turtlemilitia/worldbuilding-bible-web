import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'

import { TCompendium, TTypesAllowed } from '../../types'

interface TState {
  compendium?: TCompendium;
}

const initialState: TState = {
}

type TCompendiumChildActionProps = {
  field: 'characters'|'concepts'|'factions'|'items'|'languages'|'locations'|'species'
  data: TTypesAllowed;
}

type TCompendiumRemoveChildActionProps = {
  field: 'characters'|'concepts'|'factions'|'items'|'languages'|'locations'|'species'
  id: TTypesAllowed['slug'];
}

const compendiumSlice: Slice<TState> = createSlice({
  name: 'compendium',
  initialState,
  reducers: {
    setCompendiumData: (state, action: PayloadAction<TCompendium>) => {
      state.compendium = action.payload
    },
    updateCompendiumData: (state, action: PayloadAction<TCompendium>) => {
      state.compendium = { ...state.compendium, ...action.payload }
    },
    addCompendiumChildData: (state, action: PayloadAction<TCompendiumChildActionProps>) => {
      const field = action.payload.field;
      if (state.compendium) {
        state.compendium = {
          ...state.compendium,
          [`has${field[0].toUpperCase() + field.slice(1)}`]: true,
          [field]: [...(state.compendium[field] || []), action.payload.data]
        }
      }
    },
    updateCompendiumChildData: (state, action: PayloadAction<TCompendiumChildActionProps>) => {
      const field = action.payload.field;
      if (state.compendium) {
        state.compendium = {
          ...state.compendium,
          [field]: state.compendium[field]?.map(child => child.id === action.payload.data.id ? { ...child, ...action.payload.data } : child)
        }
      }
    },
    removeCompendiumChildData: (state, action: PayloadAction<TCompendiumRemoveChildActionProps>) => {
      const field = action.payload.field;
      if (state.compendium) {
        state.compendium = {
          ...state.compendium,
          [field]: state.compendium[field]?.filter(child => child.slug !== action.payload.id)
        }
      }
    },
    clearCompendiumData: (state) => {
      state.compendium = initialState.compendium
    }
  }
})

export const {
  setCompendiumData,
  updateCompendiumData,
  clearCompendiumData,
  addCompendiumChildData,
  updateCompendiumChildData,
  removeCompendiumChildData,
} = compendiumSlice.actions

export default compendiumSlice.reducer