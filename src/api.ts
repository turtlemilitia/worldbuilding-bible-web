import axios from 'axios'
import { store } from './store'
import { setToken } from './reducers/auth/authSlice'


const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Replace with your API base URL
});

api.defaults.withCredentials = true
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      store.dispatch(setToken(null)) // dispatch action to then handle the redirection if logged in
    } else {
      return Promise.reject(error)
    }
  }
)

export default api;