import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'

import { TCharacter, TCompendium, TConcept, TLocation } from '../../types'
import character from '../../pages/Compendium/Character'

interface TState {
  compendium: TCompendium;
}

const initialState: TState = {
  compendium: {
    name: '',
    content: '',
    hasLocations: false,
    locations: []
  }
}

const compendiumSlice: Slice<TState> = createSlice({
  name: 'compendium',
  initialState,
  reducers: {
    setCompendiumData: (state, action: PayloadAction<TCompendium>) => {
      state.compendium = action.payload
    },
    updateCompendiumData: (state, action: PayloadAction<Partial<TCompendium>>) => {
      state.compendium = { ...state.compendium, ...action.payload }
    },
    addCompendiumLocationData: (state, action: PayloadAction<TLocation>) => {
      state.compendium = {
        ...state.compendium,
        hasLocations: true,
        locations: [...(state.compendium.locations || []), action.payload]
      }
    },
    updateCompendiumLocationData: (state, action: PayloadAction<TLocation>) => {
      state.compendium = {
        ...state.compendium,
        locations: state.compendium.locations?.map(location => location.id === action.payload.id ? { ...location, ...action.payload } : location)
      }
    },
    addCompendiumCharacterData: (state, action: PayloadAction<TCharacter>) => {
      state.compendium = {
        ...state.compendium,
        hasCharacters: true,
        characters: [...(state.compendium.characters || []), action.payload]
      }
    },
    updateCompendiumCharacterData: (state, action: PayloadAction<TCharacter>) => {
      state.compendium = {
        ...state.compendium,
        characters: state.compendium.characters?.map(character => character.id === action.payload.id ? { ...character, ...action.payload } : character)
      }
    },
    addCompendiumConceptData: (state, action: PayloadAction<TConcept>) => {
      state.compendium = {
        ...state.compendium,
        hasConcepts: true,
        concepts: [...(state.compendium.concepts || []), action.payload]
      }
    },
    updateCompendiumConceptData: (state, action: PayloadAction<TConcept>) => {
      state.compendium = {
        ...state.compendium,
        concepts: state.compendium.concepts?.map(concept => concept.id === action.payload.id ? { ...concept, ...action.payload } : concept)
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
  addCompendiumLocationData,
  updateCompendiumLocationData,
  addCompendiumCharacterData,
  updateCompendiumCharacterData,
  addCompendiumConceptData,
  updateCompendiumConceptData,
} = compendiumSlice.actions

export default compendiumSlice.reducer