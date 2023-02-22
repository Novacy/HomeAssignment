import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import Login from './pages/auth/Login'
import PrivateRoute from './components/auth/PrivateRoute'
import DealList from './pages/deal/DealList'

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<PrivateRoute />}>
            <Route path='/' element={<Home />} />
          </Route>
          <Route path='/deals' element={<PrivateRoute />}>
            <Route path='/deals' element={<DealList />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  )
}

export default App
