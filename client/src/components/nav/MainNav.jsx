import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth.context'

const MainNav = () => {
  const navigate = useNavigate()
  const {
    logout,
    auth: { user, token, refreshToken },
  } = useAuth()

  const isLoggedIn = user && token && refreshToken

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handlePostAd = () => {
    if (isLoggedIn) {
      navigate('/ad/create')
    } else {
      navigate('/login')
    }
  }

  return (
    <nav className="nav d-flex justify-content-between lead">
      <div className="d-flex" style={{ gap: 12 }}>
        <NavLink className="nav-link" to="/">
          Home
        </NavLink>
        <a className="nav-link pointer" onClick={handlePostAd}>
          Post Ad
        </a>
        {!isLoggedIn ? (
          <>
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
            <NavLink className="nav-link" to="/register">
              Register
            </NavLink>
          </>
        ) : null}
      </div>
      {isLoggedIn ? (
        <div className="dropdown">
          <a
            className="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
            style={{ cursor: 'pointer' }}
          >
            {user?.name || user?.username}
          </a>
          <ul className="dropdown-menu">
            <li>
              <NavLink className="nav-link" to="/dashboard">
                Dashboard
              </NavLink>
            </li>
            <li>
              <a
                className="nav-link"
                style={{ cursor: 'pointer' }}
                onClick={handleLogout}
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </nav>
  )
}

export default MainNav
