import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'

interface TState {
  spotifyAccessToken: string | null;
  token: string|null;
}

const initialState: TState = {
  token: localStorage.getItem('token'),
  spotifyAccessToken: localStorage.getItem('spotify_access_token') || null,
}

const authSlice: Slice<TState> = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state: TState, action: PayloadAction<string>): void => {
      console.log({state, action})
      state.token = action.payload
    },
    setSpotifyAccessToken (state, action: PayloadAction<string | null>) {
      state.spotifyAccessToken = action.payload
      if (action.payload) {
        localStorage.setItem('spotify_access_token', action.payload)
      } else {
        localStorage.removeItem('spotify_access_token')
      }
    },
  }
})

export const { setToken, setSpotifyAccessToken } = authSlice.actions

export default authSlice.reducer