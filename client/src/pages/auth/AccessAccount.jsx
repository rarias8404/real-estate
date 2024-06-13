import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth.context'

const AccessAccount = () => {
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [loading, setLoading] = useState('')
  const { resetCode } = useParams()
  const { saveAuth } = useAuth()
  const navigate = useNavigate()

  const handleChange = (evt) => setPassword(evt.target.value)
  const handleChangeConfirm = (evt) => setPasswordConfirm(evt.target.value)

  const handleSubmit = async (evt) => {
    try {
      evt.preventDefault()
      if (!resetCode || !password || !passwordConfirm) return
      if (password !== passwordConfirm) {
        toast.error('Passwords do not match.')
        return
      }
      setLoading(true)
      const { data } = await axios.post('/access-account', {
        resetCode,
        password,
      })
      if (data?.error) {
        toast.error(data.error)
      } else {
        saveAuth(data)
        toast.success('Password reset successfully.', { duration: 5000 })
        navigate('/')
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="display-1 bg-primary text-light p-5">Login</h1>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 offset-4">
            <form onSubmit={handleSubmit}>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                className="form-control mb-4"
                required
                autoFocus
                value={password}
                onChange={handleChange}
              />
              <input
                type="password"
                name="passwordConfirm"
                placeholder="Confirm password"
                className="form-control mb-4"
                required
                autoFocus
                value={passwordConfirm}
                onChange={handleChangeConfirm}
              />
              <button
                className="btn btn-primary col-12 mb-4"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Reset password'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccessAccount
