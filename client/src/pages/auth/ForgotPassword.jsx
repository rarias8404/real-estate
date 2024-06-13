import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (evt) => {
    setEmail(evt.target.value)
  }

  const handleSubmit = async (evt) => {
    try {
      evt.preventDefault()
      setLoading(true)
      const { data } = await axios.post('/forgot-password', { email })
      if (data?.error) {
        toast.error(data.error)
      } else {
        toast.success('Please check your email for password reset link', {
          duration: 5000,
        })
        navigate('/')
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }
  return (
    <div>
      <h1 className="display-1 bg-primary text-light p-5">Forgot Password</h1>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 offset-4">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="form-control mb-4"
                required
                autoFocus
                value={email}
                onChange={handleChange}
              />
              <button
                className="btn btn-primary col-12 mb-4"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Submit'}
              </button>
            </form>
            <Link to="/login">Back to Login</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
