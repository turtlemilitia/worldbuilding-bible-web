import axios from 'axios'
import { store } from '@/store'
import { Simulate } from 'react-dom/test-utils'
import { setSpotifyAccessToken } from '@/reducers/auth/authSlice'

const spotifyApiURL = 'https://api.spotify.com/v1';
console.log(spotifyApiURL)
const spotifyApi = axios.create({
  baseURL: spotifyApiURL, // Replace with your API base URL
});


// Inject the **latest** token before every request
spotifyApi.interceptors.request.use((config) => {
  const stateToken = store.getState().auth.spotifyAccessToken
  const localToken = localStorage.getItem('spotify_access_token')
  const token = stateToken || localToken
  if (token) {
    config.headers = config.headers ?? {}
    config.headers.Authorization = `Bearer ${token}`
  } else {
    // ensure we don't send a stale header
    if (config.headers) delete (config.headers as any).Authorization
  }
  return config
})

// Handle 401s correctly (don’t swallow errors)
spotifyApi.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401 || error.response?.status === 419) {
      store.dispatch(setSpotifyAccessToken(null)) // dispatch action to then handle the redirection if logged in
      localStorage.removeItem('spotify_access_token')
    }
    return Promise.reject(error)
  }
)

export default spotifyApi;