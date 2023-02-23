import axios from 'axios'

import { LoginPayload, RegisterPayload } from './authPayload'

const API_URL = '/api/auth'

// Register user
const register = async (payload: RegisterPayload) => {
  const response = await axios.post(`${API_URL}/register`, payload)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data.data))
  }
  return response.data.data
}

// Login user
const login = async (payload: LoginPayload) => {
  const response = await axios.post(`${API_URL}/login`, payload)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data.data))
  }
  return response.data.data
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
