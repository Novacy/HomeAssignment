import { useAuthStatus } from '../../hooks/UseAuthStatus'
import Spinner from '../global/Spinner'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
  const { authStatus, checkingStatus } = useAuthStatus()

  if (checkingStatus) {
    return <Spinner />
  }

  if (!authStatus) {
    return <Navigate to='/login' />
  }
  return <Outlet />
}

export default PrivateRoute
