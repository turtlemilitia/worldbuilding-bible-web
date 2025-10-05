import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react'
import { Spotify } from '@/types/Spotify'
import { useAppDispatch, useAppSelector } from '@/hooks'
import {
  setCurrentTrack,
  setDeviceId,
  setIsActive,
  setIsPaused,
} from '@/reducers/music/musicPlayerSlice'
import { setSpotifyAccessToken } from '@/reducers/auth/authSlice'

export const MusicPlayerContext = createContext<Spotify.Player|null>(null)
export const MusicPlayerProvider = ({ children }: PropsWithChildren) => {

  const dispatch = useAppDispatch()

  const token = useAppSelector((state) => state.auth.spotifyAccessToken)

  const [player, setPlayer] = useState<Spotify.Player>(null)

  // Load the SDK and create player once
  useEffect(() => {
    if (!token || document.getElementById('spotify-player')) {
      return
    }

    const script = document.createElement('script')
    script.src = 'https://sdk.scdn.co/spotify-player.js'
    script.id = 'spotify-player'
    script.async = true
    document.body.appendChild(script);

    (window as any).onSpotifyWebPlaybackSDKReady = () => {
      const spotifyPlayer = new (window as any).Spotify.Player({
        name: 'Worldbuilding Tome',
        getOAuthToken: (cb: Function) => cb(token),
        volume: 0.5,
      })

      console.log('Spotify player created', spotifyPlayer)
      setPlayer(spotifyPlayer)

      spotifyPlayer.addListener('ready', ({ device_id }: { device_id: string }) => {
        dispatch(setDeviceId(device_id))
      })
      spotifyPlayer.addListener('authentication_error', () => {
        localStorage.removeItem('spotify_access_token')
        // dispatch action to clear token
        dispatch(setSpotifyAccessToken(null))
      })

      // When playback state changes, update local state
      spotifyPlayer.addListener('player_state_changed', (state: any) => {
        if (!state) {
          return
        }
        dispatch(setCurrentTrack(state.track_window.current_track))
        dispatch(setIsPaused(state.paused))
        spotifyPlayer.getCurrentState()
          .then((s: any) => dispatch(setIsActive(!!s)))
      })

      spotifyPlayer.addListener('autoplay_failed', () => {
        console.log('Autoplay is not allowed by the browser autoplay rules')
      })

      spotifyPlayer.addListener('not_ready', ({ device_id }: { device_id: string }) => {
          console.log('Device ID has gone offline', device_id)
        })

      spotifyPlayer.connect()
    }
  }, [token])

  return (
    <MusicPlayerContext.Provider value={player}>
      {children}
    </MusicPlayerContext.Provider>
  )
}