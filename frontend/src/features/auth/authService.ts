import axios from 'axios'

import { LoginPayload, RegisterPayload } from './authPayload'

// const API_URL = '/api/auth'
const API_URL = '/api/users'

// Register user
const register = async (payload: RegisterPayload) => {
  const response = await axios.post(`${API_URL}/register`, payload)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

// Login user
const login = async (payload: LoginPayload) => {
  const response = await axios.post(`${API_URL}/login`, payload)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  login,
  logout,
}

export default authService
