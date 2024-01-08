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
import campaignSlice from './reducers/campaign/campaignSlice'
import campaignsIndexSlice from './reducers/campaign/campaignsIndexSlice'
import religionSlice from './reducers/compendium/religion/religionSlice'
import currencySlice from './reducers/compendium/currency/currencySlice'
import storySlice from './reducers/compendium/story/storySlice'
import deitySlice from './reducers/compendium/deity/deitySlice'
import encounterSlice from './reducers/compendium/encounter/encounterSlice'
import questSlice from './reducers/compendium/quest/questSlice'
import spellSlice from './reducers/compendium/spell/spellSlice'
import naturalResourceSlice from './reducers/compendium/naturalResource/naturalResourceSlice'
import planeSlice from './reducers/compendium/plane/planeSlice'
import pantheonSlice from './reducers/compendium/pantheon/pantheonSlice'
import imageTypesIndexSlice from './reducers/imageType/imageTypesIndexSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    // indexes
    systems: systemsIndexSlice,
    compendia: compendiaIndexSlice,
    campaigns: campaignsIndexSlice,
    notebooks: notebooksIndexSlice,
    imageTypes: imageTypesIndexSlice,
    // individual
    system: systemSlice,
    compendium: compendiumSlice,
    character: characterSlice,
    concept: conceptSlice,
    currency: currencySlice,
    deity: deitySlice,
    encounter: encounterSlice,
    faction: factionSlice,
    item: itemSlice,
    language: languageSlice,
    location: locationSlice,
    naturalResource: naturalResourceSlice,
    pantheon: pantheonSlice,
    plane: planeSlice,
    quest: questSlice,
    religion: religionSlice,
    species: speciesSlice,
    spell: spellSlice,
    story: storySlice,
    notebook: notebookSlice,
    note: noteSlice,
    // campaign
    campaign: campaignSlice,
    session: sessionSlice,
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch