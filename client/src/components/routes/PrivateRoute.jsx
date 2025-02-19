import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../../context/auth.context'
import axios from 'axios'

const PrivateRoute = () => {
  const { auth } = useAuth()
  const [ok, setOk] = useState(false)

  useEffect(() => {
    if (auth?.token) getCurrentUser()
  }, [auth?.token])

  async function getCurrentUser() {
    try {
      await axios.get('/current-user', {
        headers: {
          Authorization: auth.token,
        },
      })
      setOk(true)
    } catch (error) {
      setOk(false)
    }
  }

  return ok ? (
    <>
      <Outlet />
    </>
  ) : null
}

export default PrivateRoute
