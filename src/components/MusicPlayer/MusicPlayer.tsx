import { FunctionComponent, useEffect, useState } from 'react'
import { MusicIcon } from 'lucide-react'
import api from '@/api'
import { useLocation, useNavigate } from 'react-router-dom'
import WebPlayback from '@/components/MusicPlayer/WebPlayback'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { useAppDispatch } from '@/hooks'
import { setSpotifyAccessToken } from '@/reducers/auth/authSlice'

const MusicPlayer: FunctionComponent = () => {

  const location = useLocation()

  const [hovered, setHovered] = useState(false)

  const accessToken = useSelector((state: RootState) => state.auth.spotifyAccessToken);
  const dispatch = useAppDispatch()

  const handleLogin = () => {
    if (accessToken) {
      return
    }
    api.post('/api/spotify/auth/login', {
      'redirectUrl': window.location.href,
    })
      .then(res => {
        window.open(res.data.url, '_blank')
      })
  }

  useEffect(() => {
    if (location.search) { // todo need to change this for searchParams
      api.get(`/api/spotify/auth/callback${location.search}`)
        .then(res => {
          localStorage.setItem('spotify_access_token', res.data.spotify_access_token)
          window.close()
        })
    }
  }, [location.search])

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
      {accessToken && <WebPlayback open={hovered}/>}
    </div>
  )
}

export default MusicPlayer