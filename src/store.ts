import { configureStore } from '@reduxjs/toolkit'
import authSlice from './reducers/auth/authSlice'
import systemsIndexSlice from './reducers/system/systemsIndexSlice'
import notesIndexSlice from '@/reducers/note/notesIndexSlice'
import compendiaIndexSlice from './reducers/compendium/compendiaIndexSlice'
import campaignsIndexSlice from './reducers/campaign/campaignsIndexSlice'
import imageTypesIndexSlice from './reducers/imageType/imageTypesIndexSlice'
import postSlice from './reducers/post/postSlice'
import governmentTypesIndexSlice from './reducers/governmentType/governmentTypesIndexSlice'
import locationTypesIndexSlice from './reducers/locationType/locationTypesIndexSlice'
import questTypesIndexSlice from './reducers/questType/questTypesIndexSlice'
import encounterTypesIndexSlice from './reducers/encounterType/encounterTypesIndexSlice'
import authUserSlice from './reducers/auth/authUserSlice'
import userSlice from './reducers/auth/userSlice'
import imagesIndexSlice from '@/reducers/image/imagesIndexSlice'
import musicPlayerSlice from '@/reducers/music/musicPlayerSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    authUser: authUserSlice,
    user: userSlice,
    images: imagesIndexSlice,
    // system
    post: postSlice,
    // indexes
    systems: systemsIndexSlice,
    compendia: compendiaIndexSlice,
    campaigns: campaignsIndexSlice,
    notes: notesIndexSlice,
    imageTypes: imageTypesIndexSlice,
    governmentTypes: governmentTypesIndexSlice,
    locationTypes: locationTypesIndexSlice,
    questTypes: questTypesIndexSlice,
    encounterTypes: encounterTypesIndexSlice,
    // other
    musicPlayer: musicPlayerSlice
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch