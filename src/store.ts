import { configureStore } from '@reduxjs/toolkit'
import authSlice from './reducers/auth/authSlice'
import systemsIndexSlice from './reducers/system/systemsIndexSlice'
import systemSlice from './reducers/system/systemSlice'
import compendiaIndexSlice from './reducers/compendium/compendiaIndexSlice'
import compendiumSlice from './reducers/compendium/compendiumSlice'
import conceptSlice from './reducers/compendium/concept/conceptSlice'
import speciesSlice from './reducers/compendium/species/speciesSlice'
import locationSlice from './reducers/compendium/location/locationSlice'
import characterSlice from './reducers/compendium/character/characterSlice'
import itemSlice from './reducers/compendium/item/itemSlice'
import factionSlice from './reducers/compendium/faction/factionSlice'
import languageSlice from './reducers/compendium/language/languageSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    // indexes
    systems: systemsIndexSlice,
    compendia: compendiaIndexSlice,
    // individual
    system: systemSlice,
    compendium: compendiumSlice,
    concept: conceptSlice,
    species: speciesSlice,
    location: locationSlice,
    character: characterSlice,
    item: itemSlice,
    faction: factionSlice,
    language: languageSlice,
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch