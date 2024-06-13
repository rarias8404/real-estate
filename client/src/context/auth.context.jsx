import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const AuthContext = createContext()

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

  axios.defaults.baseURL = import.meta.env.VITE_API_URL

  const saveAuth = (user) => {
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
