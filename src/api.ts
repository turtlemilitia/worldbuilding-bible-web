import axios from 'axios'
import { store } from './store'
import { setToken } from './reducers/auth/authSlice'

const apiURL = import.meta.env.VITE_API_URL;
console.log(apiURL)
const api = axios.create({
  baseURL: apiURL, // Replace with your API base URL
});

api.defaults.withCredentials = true
api.defaults.withXSRFToken = true
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401 || error.response?.status === 419) {
      store.dispatch(setToken(null)) // dispatch action to then handle the redirection if logged in
      window.location.href = '/login'
    } else if (error.response?.status === 404 && error.response.config.method !== 'delete') {
      window.location.href = '/404'
    } else {
      return Promise.reject(error)
    }
  }
)

export default api;