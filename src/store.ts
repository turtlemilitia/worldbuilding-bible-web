import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/auth/authSlice'
import systemsIndexReducer from './reducers/system/systemsIndexSlice'
import systemReducer from './reducers/system/systemSlice'
import compendiaIndexReducer from './reducers/compendium/compendiaIndexSlice'
import compendiumReducer from './reducers/compendium/compendiumSlice'
import locationReducer from './reducers/compendium/location/locationSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // indexes
    systems: systemsIndexReducer,
    compendia: compendiaIndexReducer,
    // individual
    system: systemReducer,
    compendium: compendiumReducer,
    location: locationReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch