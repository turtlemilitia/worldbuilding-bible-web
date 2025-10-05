import { useCallback, useContext } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import {
  setCurrentTrack, setIsPaused, setRemoteDeviceId,
} from '@/reducers/music/musicPlayerSlice'
import { useAppDispatch } from '@/hooks'
import { delay, isString } from 'lodash'
import spotifyApi from '@/spotifyApi'
import { MusicPlayerContext } from '@/pages/MusicPlayerProvider'

export function useSpotifyPlayer () {

  const token = useSelector((state: RootState) => state.auth.spotifyAccessToken)

  const player = useContext(MusicPlayerContext)

  const dispatch = useAppDispatch()

  const {
    isActive,
    isPaused,
    currentTrack,
    deviceId,
    remoteDeviceId,
  } = useSelector((state: RootState) => state.musicPlayer)

  const checkState = useCallback(() => {

    console.log('Checking state')
    spotifyApi.get('/me/player')
      .then(({ data }) => {
        dispatch(setRemoteDeviceId(data.device?.id || null))
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
    if (!isActive) {
      // allow autoplay
      player.activateElement()
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

  }, [deviceId, remoteDeviceId, token, isActive, player])

  // Play to this device if not active
  const pause = useCallback(async () => {
    if (!token) {
      return
    }

    if (isActive && player) {
      player.pause()
      return
    }

    // allow autoplay
    spotifyApi.put('/me/player/pause')
      .then(res => {
        dispatch(setIsPaused(true))
      })

  }, [token, player])

  const next = useCallback(() => {
    if (!token) {
      return
    }
    if (isActive && player) {
      return player.nextTrack()
    }

    spotifyApi.post('/me/player/next')
      .then(() => delay(checkState, 1000))
  }, [token, isActive, player, checkState])

  const previous = useCallback(() => {
    if (!token) {
      return
    }
    if (isActive && player) {
      return player.previousTrack()
    }

    spotifyApi.post('/me/player/previous')
      .then(() => delay(checkState, 1000))
  }, [token, isActive, player, checkState])

  return {
    currentTrack,
    isPaused,
    isActive,
    play,
    pause,
    next,
    previous,
    deviceId,
    activate,
    checkState,
    isAuthed: !!token,
  };
}