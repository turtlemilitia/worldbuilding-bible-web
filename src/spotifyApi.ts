import axios from 'axios'
import { store } from '@/store'
import { setSpotifyAccessToken } from '@/reducers/auth/authSlice'
import api from '@/api'

const spotifyApiURL = 'https://api.spotify.com/v1';
console.log(spotifyApiURL)
const spotifyApi = axios.create({
  baseURL: spotifyApiURL, // Replace with your API base URL
});

// --- Refresh-on-401 with single-flight guard ---
let refreshPromise: Promise<string> | null = null

async function refreshAccessToken(): Promise<string> {
  const refreshToken = localStorage.getItem('spotify_refresh_token')
  if (!refreshToken) {
    throw new Error('No refresh token available')
  }

  // Ensure only one refresh happens at a time
  if (!refreshPromise) {
    refreshPromise = api
      .put('/api/spotify/auth/refresh', { refresh_token: refreshToken })
      .then(({ data }) => {
        const newAccess = data.spotify_access_token as string
        // persist & propagate
        localStorage.setItem('spotify_access_token', newAccess)
        store.dispatch(setSpotifyAccessToken(newAccess))
        if (data.spotify_refresh_token) {
          localStorage.setItem('spotify_refresh_token', data.spotify_refresh_token)
        }
        return newAccess
      })
      .finally(() => {
        // allow future refresh attempts
        refreshPromise = null
      })
  }

  return refreshPromise
}


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

// Handle 401s by calling our backend refresh endpoint and retrying once
spotifyApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status
    const originalRequest = error.config || {}

    if (status === 401) {
      try {
        const newToken = await refreshAccessToken()
        originalRequest.headers = originalRequest.headers || {}
        originalRequest.headers.Authorization = `Bearer ${newToken}`
        // mark a retry to avoid loops
        if (originalRequest._retry) {
          throw error
        }
        originalRequest._retry = true
        return spotifyApi.request(originalRequest)
      } catch (refreshErr) {
        // hard logout on failed refresh
        store.dispatch(setSpotifyAccessToken(null))
        localStorage.removeItem('spotify_access_token')
        localStorage.removeItem('spotify_refresh_token')
      }
    }

    return Promise.reject(error)
  }
)

export default spotifyApi;