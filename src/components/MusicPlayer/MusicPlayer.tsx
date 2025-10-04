import { FunctionComponent, useEffect, useState } from 'react'
import { MusicIcon, RefreshCcwIcon } from 'lucide-react'
import api from '@/api'
import { useLocation, useSearchParams } from 'react-router-dom'
import WebPlayback from '@/components/MusicPlayer/WebPlayback'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { useAppDispatch } from '@/hooks'
import { setSpotifyAccessToken } from '@/reducers/auth/authSlice'

const MusicPlayer: FunctionComponent = () => {

  const location = useLocation()

  const [hovered, setHovered] = useState(false)
  const [searchParams] = useSearchParams()

  const accessToken = useSelector((state: RootState) => state.auth.spotifyAccessToken);
  const dispatch = useAppDispatch()

  const handleLogin = () => {
    if (accessToken) {
      return
    }
    api.post('/api/spotify/auth/login')
      .then(res => {
        window.open(res.data.url, '_blank', 'noopener,noreferrer')
      })
  }

  const handleRefreshToken = () => {
    const refreshToken = localStorage.getItem('spotify_refresh_token')
    if (!refreshToken) {
      console.error('No spotify_refresh_token found in localStorage')
      return
    }
    api.put(`/api/spotify/auth/refresh`, { refreshToken })
      .then(({ data }) => {
        localStorage.setItem('spotify_access_token', data.spotify_access_token)
        if (data.spotify_refresh_token) {
          localStorage.setItem('spotify_refresh_token', data.spotify_refresh_token)
        }
        dispatch(setSpotifyAccessToken(data.spotify_access_token))
      })
  }

  const handleCallback = (code: string) => {
    api.get(`/api/spotify/auth/callback?code=${code}`)
      .then(({ data }) => {
        localStorage.setItem('spotify_access_token', data.spotify_access_token)
        localStorage.setItem('spotify_refresh_token', data.spotify_refresh_token)
        window.close()
      })
  }

  useEffect(() => {
    if (searchParams.get('code')) {
      handleCallback(searchParams.get('code')!)
    }
  }, [searchParams])

  useEffect(() => {
    function checkUserData () {
      const item = localStorage.getItem('spotify_access_token')

      if (item) {
        dispatch(setSpotifyAccessToken(item))
      }
    }

    window.addEventListener('storage', checkUserData)

    return () => {
      window.removeEventListener('storage', checkUserData)
    }
  }, [])

  function handleHovered () {
    if (!accessToken) {
      return
    }
    return setHovered(true)
  }

  function handleNotHovered () {
    if (!accessToken) {
      return
    }
    return setHovered(false)
  }

  return (
    <div
      className={`fixed bottom-4 right-4 rounded-full shadow-md shadow-stone-950 border border-opacity-30 border-stone-400 bg-stone-400 bg-opacity-10 text-stone-200 px-3 py-3 backdrop-blur-sm cursor-pointer flex flex-row z-40`}
      onMouseEnter={handleHovered}
      onMouseLeave={handleNotHovered}
    >
      <MusicIcon className={'h-5 w-5'} onClick={handleLogin}/>
      <RefreshCcwIcon className={'h-5 w-5'} onClick={handleRefreshToken}/>
      {accessToken && <WebPlayback open={hovered}/>}
    </div>
  )
}

export default MusicPlayer