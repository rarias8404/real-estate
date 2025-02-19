import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/auth.context'
// pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AccountActivate from './pages/auth/AccountActivate'
import ForgotPassword from './pages/auth/ForgotPassword'
import Dashboard from './pages/user/Dashboard'
import AdCreate from './pages/ad/AdCreate'
import SellHouse from './pages/ad/SellHouse'
import SellLand from './pages/ad/SellLand'
import RentHouse from './pages/ad/RentHouse'
import RentLand from './pages/ad/RentLand'
// common
import MainNav from './components/nav/MainNav'
import AccessAccount from './pages/auth/AccessAccount'
import PrivateRoute from './components/routes/PrivateRoute'

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
          <Route path="/" element={<PrivateRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="ad/create" element={<AdCreate />} />
            <Route path="ad/create/sell/house" element={<SellHouse />} />
            <Route path="ad/create/sell/land" element={<SellLand />} />
            <Route path="ad/create/rent/house" element={<RentHouse />} />
            <Route path="ad/create/rent/land" element={<RentLand />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
