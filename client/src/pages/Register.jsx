import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const Register = () => {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

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
      const { data } = await axios.post('/pre-register', { ...form })
      if (data?.error) {
        toast.error(data.error)
      } else {
        toast.success(
          'Registration successful. Please check your email for verification link.',
          { duration: 5000 }
        )
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
      <h1 className="display-1 bg-primary text-light p-5">Register</h1>
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
                {loading ? 'Loading...' : 'Register'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
