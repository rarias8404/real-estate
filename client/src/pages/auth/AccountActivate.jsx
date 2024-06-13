import axios from 'axios'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth.context'

const AccountActivate = () => {
  const { token } = useParams()
  const { saveAuth } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const requestActivation = async () => {
      try {
        const { data } = await axios.post('/register', { token })
        if (data?.error) {
          toast.error(data.error)
        } else {
          saveAuth(data)
          toast.success('Successfully logged in. Welcome.', { duration: 5000 })
          navigate('/')
        }
      } catch (error) {
        toast.error('Something went wrong. Try again.')
      }
    }
    if (token) requestActivation()
  }, [token])

  return (
    <div
      className="display-1 d-flex justify-content-center align-items-center vh-100"
      style={{ marginTop: '-5%' }}
    >
      Please wait...
    </div>
  )
}

export default AccountActivate
