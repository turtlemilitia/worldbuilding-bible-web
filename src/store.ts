import { configureStore } from '@reduxjs/toolkit'
import authSlice from './reducers/auth/authSlice'
import systemsIndexSlice from './reducers/system/systemsIndexSlice'
import systemSlice from './reducers/system/systemSlice'
import notebooksIndexSlice from './reducers/notebook/notebooksIndexSlice'
import compendiaIndexSlice from './reducers/compendium/compendiaIndexSlice'
import compendiumSlice from './reducers/compendium/compendiumSlice'
import conceptSlice from './reducers/compendium/concept/conceptSlice'
import speciesSlice from './reducers/compendium/species/speciesSlice'
import locationSlice from './reducers/compendium/location/locationSlice'
import characterSlice from './reducers/compendium/character/characterSlice'
import itemSlice from './reducers/compendium/item/itemSlice'
import factionSlice from './reducers/compendium/faction/factionSlice'
import languageSlice from './reducers/compendium/language/languageSlice'
import notebookSlice from './reducers/notebook/notebookSlice'
import noteSlice from './reducers/notebook/note/noteSlice'
import sessionSlice from './reducers/campaign/session/sessionSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    // indexes
    systems: systemsIndexSlice,
    compendia: compendiaIndexSlice,
    notebooks: notebooksIndexSlice,
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
    notebook: notebookSlice,
    note: noteSlice,
    // campaign
    session: sessionSlice,
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch