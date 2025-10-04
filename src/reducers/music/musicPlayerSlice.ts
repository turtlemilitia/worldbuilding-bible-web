import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Spotify } from '@/types/Spotify'

interface PlayerState {
  webPlaybackSDKReady: boolean;
  isActive: boolean;
  deviceId: string | null;
  remoteDeviceId: string | null;
  isPaused: boolean;
  currentTrack: Spotify.Player | null;
}

const initialState: PlayerState = {
  webPlaybackSDKReady: false,
  isActive: false,
  deviceId: null,
  remoteDeviceId: null,
  isPaused: true,
  currentTrack: null,
}

const musicPlayerSlice = createSlice({
  name: 'musicPlayer',
  initialState,
  reducers: {
    setWebPlaybackSDKReady (state, action: PayloadAction<boolean>) {
      state.webPlaybackSDKReady = action.payload
    },
    setIsActive (state, action: PayloadAction<boolean>) {
      state.isActive = action.payload
    },
    setDeviceId (state, action: PayloadAction<string | null>) {
      state.deviceId = action.payload
    },
    setRemoteDeviceId (state, action: PayloadAction<string | null>) {
      state.remoteDeviceId = action.payload
    },
    setIsPaused (state, action: PayloadAction<boolean>) {
      state.isPaused = action.payload
    },
    setCurrentTrack (state, action: PayloadAction<Spotify.Track | null>) {
      state.currentTrack = action.payload
    },
  },
})

export const { setIsActive, setDeviceId, setIsPaused, setCurrentTrack, setRemoteDeviceId } = musicPlayerSlice.actions

export default musicPlayerSlice.reducer