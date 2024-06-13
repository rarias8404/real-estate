import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../context/auth.context'

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { saveAuth } = useAuth()

  const handleChange = (evt) => {
    setForm({
      ...form,
      [evt.target.name]: evt.target.value,
    })
  }

  const handleSubmit = async (evt) => {
    try {
      evt.preventDefault()
      setLoading(true)
      const { data } = await axios.post('/login', { ...form })
      if (data?.error) {
        toast.error(data.error)
      } else {
        saveAuth(data)
        toast.success('Login successful', { duration: 5000 })
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
                type="text"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="form-control mb-4"
                required
                autoFocus
                value={form.email}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                className="form-control mb-4"
                required
                autoFocus
                value={form.password}
                onChange={handleChange}
              />
              <button
                className="btn btn-primary col-12 mb-4"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Login'}
              </button>
            </form>
            <Link className="text-danger" to="/auth/forgot-password">
              Forgot password
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
