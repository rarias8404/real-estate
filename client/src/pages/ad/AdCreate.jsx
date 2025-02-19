import { useState } from 'react'
import Sidebar from '../../components/nav/Sidebar'
import { useNavigate } from 'react-router-dom'

const AdCreate = () => {
  const [sell, setSell] = useState(false)
  const [rent, setRent] = useState(false)
  const navigate = useNavigate()

  const handleSell = () => {
    setSell(true)
    setRent(false)
  }
  const handleRent = () => {
    setSell(false)
    setRent(true)
  }

  return (
    <div>
      <h1 className="display-1 bg-primary text-light p-5">AdCreate</h1>
      <Sidebar />

      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{ marginTop: '-9%' }}
      >
        <div className="col-lg-6">
          <button
            className="btn btn-primary btn-large col-12 p-5"
            onClick={handleSell}
          >
            <span className="h2">Sell</span>
          </button>
          {sell && (
            <div className="my-1">
              <button
                className="btn btn-secondary p-5 col-6"
                onClick={() => navigate('/ad/create/sell/House')}
              >
                House
              </button>
              <button
                className="btn btn-secondary p-5 col-6"
                onClick={() => navigate('/ad/create/sell/Land')}
              >
                Land
              </button>
            </div>
          )}
        </div>
        <div className="col-lg-6">
          <button
            className="btn btn-primary btn-large col-12 p-5"
            onClick={handleRent}
          >
            <span className="h2">Rent</span>
          </button>
          {rent && (
            <div className="my-1">
              <button
                className="btn btn-secondary p-5 col-6"
                onClick={() => navigate('/ad/create/rent/House')}
              >
                House
              </button>
              <button
                className="btn btn-secondary p-5 col-6"
                onClick={() => navigate('/ad/create/rent/Land')}
              >
                Land
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdCreate
