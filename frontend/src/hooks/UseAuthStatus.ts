import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../app/strore'

export const useAuthStatus = () => {
  const [authStatus, setAuthStatus] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true)

  const { user } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (user) {
      setAuthStatus(true)
    } else {
      setAuthStatus(false)
    }
    setCheckingStatus(false)
  }, [user])

  return { authStatus, checkingStatus }
}
