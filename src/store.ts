import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/auth/authSlice'
import systemsIndexReducer from './reducers/system/systemsIndexSlice'
import systemReducer from './reducers/system/systemSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // indexes
    systems: systemsIndexReducer,
    // individual
    system: systemReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch