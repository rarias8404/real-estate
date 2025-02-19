import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const AuthContext = createContext(undefined)

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: '',
    refreshToken: '',
  })

  useEffect(() => {
    const session = localStorage.getItem('auth')
    if (session) {
      setAuth(JSON.parse(session))
    }
  }, [])

  // config axios
  axios.defaults.baseURL = import.meta.env.VITE_API_URL
  axios.defaults.headers.common = {
    Authorization: auth?.token,
    refresh_token: auth?.refreshToken,
  }

  axios.interceptors.response.use(
    (res) => {
      return res
    },
    async (err) => {
      const originalConfig = err.config

      if (err.response) {
        // token is expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true

          try {
            const { data } = await axios.get('/refresh-token')
            axios.defaults.headers.common = {
              token: data.token,
              refresh_token: data.refreshToken,
            }

            saveAuth(data)

            return axios(originalConfig)
          } catch (_error) {
            if (_error.response && _error.response.data) {
              return Promise.reject(_error.response.data)
            }
            return Promise.reject(_error)
          }
        }

        if (err.response.status === 403 && err.response.data) {
          return Promise.reject(err.response.data)
        }
      }

      return Promise.reject(err)
    }
  )

  function saveAuth(user) {
    setAuth(user)
    localStorage.setItem('auth', JSON.stringify(user))
  }

  const logout = () => {
    setAuth({ user: null, token: '', refreshToken: '' })
    localStorage.removeItem('auth')
  }

  return (
    <AuthContext.Provider value={{ auth, saveAuth, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
