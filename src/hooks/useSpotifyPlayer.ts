import { useCallback, useEffect, useState } from 'react'
import { Spotify } from '@/types/Spotify'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import {
  setCurrentTrack, setDeviceId,
  setIsActive,
  setIsPaused, setRemoteDeviceId,
} from '@/reducers/music/musicPlayerSlice'
import { useAppDispatch } from '@/hooks'
import { setSpotifyAccessToken } from '@/reducers/auth/authSlice'
import { delay, isString } from 'lodash'
import spotifyApi from '@/spotifyApi'

export function useSpotifyPlayer () {

  const token = useSelector(
    (state: RootState) => state.auth.spotifyAccessToken)

  const [player, setPlayer] = useState<Spotify.Player | null>(null)

  const dispatch = useAppDispatch()

  const {
    isActive,
    isPaused,
    currentTrack,
    deviceId,
    remoteDeviceId,
  } = useSelector((state: RootState) => state.musicPlayer)

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

      spotifyPlayer.addListener('ready',
        ({ device_id }: { device_id: string }) => dispatch(
          setDeviceId(device_id)))
      spotifyPlayer.addListener('authentication_error',
        ({ message }: { message: string }) => {
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

      spotifyPlayer.addListener('not_ready',
        ({ device_id }: { device_id: string }) => {
          console.log('Device ID has gone offline', device_id)
        })

      spotifyPlayer.connect()

      checkState()
    }
  }, [token])

  const checkState = useCallback(() => {

    console.log('Checking state')
    spotifyApi.get('/me/player')
      .then(({ data }) => {
        dispatch(setRemoteDeviceId(data.device.id))
        dispatch(setCurrentTrack(data.item))
        dispatch(setIsPaused(!data.is_playing))
      })

  }, [token])

  // Helper: transfer playback to this device if not active
  const activate = useCallback(() => {
    if (!deviceId || !token) {
      return
    }
    if (!isActive) {
      // allow autoplay
      player.activateElement()
      spotifyApi.put('/me/player', { device_ids: [deviceId], play: true })
    }
  }, [deviceId, token, isActive, player])

  // Play to this device if not active
  const play = useCallback(async (contextUri?: string) => {
    if (!token) {
      return
    }

    const device = remoteDeviceId || deviceId
    // allow autoplay
    spotifyApi.put(`/me/player/play${device ? `?device_id=${device}` : ''}`,
      contextUri && isString(contextUri) ? { context_uri: contextUri } : {}
    )
      .then(() => {
        dispatch(setIsPaused(false))

        if (!isActive) {
          delay(checkState, 1000)
        }
      })

  }, [deviceId, remoteDeviceId, token, isActive])

  // Play to this device if not active
  const pause = useCallback(async () => {
    if (!token) {
      return
    }

    if (isActive) {
      player.pause()
      return
    }

    // allow autoplay
    spotifyApi.put('/me/player/pause')
      .then(res => {
        dispatch(setIsPaused(true))
      })

  }, [token])

  const next = useCallback(() => {
    if (!token) {
      return
    }
    if (isActive) {
      return player.nextTrack()
    }

    spotifyApi.post('/me/player/next')
      .then(() => delay(checkState, 1000))
  }, [player])
  const previous = useCallback(() => {
    if (!token) {
      return
    }
    if (isActive) {
      return player.previousTrack()
    }

    spotifyApi.post('/me/player/previous')
      .then(() => delay(checkState, 1000))
  }, [player])

  return {
    player,
    currentTrack,
    isPaused,
    isActive,
    play,
    pause,
    next,
    previous,
    deviceId,
    activate,
    isAuthed: !!token,
  };
}