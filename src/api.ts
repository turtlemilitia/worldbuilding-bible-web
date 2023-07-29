import axios from 'axios'
import { store } from './store'
import { unsetToken } from './reducers/auth/authSlice'


const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Replace with your API base URL
});

api.defaults.withCredentials = true
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401 || error.response.status === 419) {
      console.log('errored on status ' + error.response.status + '. Unsetting token...')
      store.dispatch(unsetToken(undefined)) // dispatch action to then handle the redirection if logged in
    }
    return Promise.reject(error)
  }
)

export default api;