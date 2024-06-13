import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/auth.context'
// pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AccountActivate from './pages/auth/AccountActivate'
import ForgotPassword from './pages/auth/ForgotPassword'
// common
import MainNav from './components/nav/MainNav'
import AccessAccount from './pages/auth/AccessAccount'

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MainNav />
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/auth/account-activate/:token"
            element={<AccountActivate />}
          />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/auth/access-account/:resetCode"
            element={<AccessAccount />}
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
