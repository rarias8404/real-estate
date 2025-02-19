import React from 'react'
import { useAuth } from '../context/auth.context'

const Home = () => {
  const { auth } = useAuth()
  return (
    <div>
      <h1 className="display-1 bg-primary text-light p-5">Home</h1>
      <pre>{JSON.stringify(auth, null, 2)}</pre>
    </div>
  )
}

export default Home
