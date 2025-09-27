import { useCallback, useEffect, useState } from 'react'
import { Spotify } from '@/types/Spotify'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import {
  setCurrentTrack, setDeviceId,
  setIsActive,
  setIsPaused,
} from '@/reducers/music/musicPlayerSlice'
import { useAppDispatch } from '@/hooks'
import { setSpotifyAccessToken } from '@/reducers/auth/authSlice'

export function useSpotifyPlayer(token: string | null) {

  const [player, setPlayer] = useState<Spotify.Player | null>(null);

  const dispatch = useAppDispatch();

  const {
    isActive,
    isPaused,
    currentTrack,
    deviceId,
  } = useSelector((state: RootState) => state.musicPlayer);

  // Load the SDK and create player once
  useEffect(() => {
    if (!token || document.getElementById('spotify-player')) return;

    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.id = 'spotify-player';
    script.async = true;
    document.body.appendChild(script);

    (window as any).onSpotifyWebPlaybackSDKReady = () => {
      const spotifyPlayer = new (window as any).Spotify.Player({
        name: 'Worldbuilding Tome',
        getOAuthToken: (cb: Function) => cb(token),
        volume: 0.5,
      });

      console.log('Spotify player created');
      setPlayer(spotifyPlayer);

      spotifyPlayer.addListener('ready', ({ device_id }: { device_id: string }) => dispatch(setDeviceId(device_id)));
      spotifyPlayer.addListener('authentication_error', ({ message }: { message: string }) => {
        localStorage.removeItem('spotify_access_token');
        // dispatch action to clear token
        dispatch(setSpotifyAccessToken(null));
      });

      // When playback state changes, update local state
      spotifyPlayer.addListener('player_state_changed', (state: any) => {
        if (!state) return;
        dispatch(setCurrentTrack(state.track_window.current_track));
        dispatch(setIsPaused(state.paused));
        spotifyPlayer.getCurrentState().then((s: any) => dispatch(setIsActive(!!s)));
      });

      spotifyPlayer.addListener('autoplay_failed', () => {
        console.log('Autoplay is not allowed by the browser autoplay rules');
      });

      spotifyPlayer.addListener('not_ready', ({ device_id }: { device_id: string }) => {
        console.log('Device ID has gone offline', device_id);
      });

      spotifyPlayer.connect();
    };
  }, [token]);

  // Helper: transfer playback to this device if not active
  const activate = useCallback(async () => {
    if (!deviceId || !token) return;
    if (!isActive) {
      // allow autoplay
      player.activateElement();
      await fetch('https://api.spotify.com/v1/me/player', {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ device_ids: [deviceId], play: true }),
      });
    }
  }, [deviceId, token, isActive]);

  const play = useCallback(() => player.resume(), [player]);
  const pause = useCallback(() => player.pause(), [player]);
  const next = useCallback(() => player.nextTrack(), [player]);
  const previous = useCallback(() => player.previousTrack(), [player]);

  return { player, currentTrack, isPaused, isActive, play, pause, next, previous, deviceId, activate };
}