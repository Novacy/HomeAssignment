import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/deals')
  }, [navigate])

  return <div>Home</div>
}

export default Home
