import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import authService from './authService'
import { LoginPayload, RegisterPayload } from './authPayload'
import { User } from '../../types/models'
import type { AxiosError } from 'axios'
import { ValidationErrors } from '../../types/errors'

// Need to check if localstorage has user or not
const user: User | null = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user') || '')
  : null

interface AuthState {
  user: User | null
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  message?: string
}

const initialState: AuthState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Register new user
export const register = createAsyncThunk<
  User,
  RegisterPayload,
  {
    rejectValue: ValidationErrors
  }
>('auth/register', async (payload: RegisterPayload, thunkAPI) => {
  try {
    return await authService.register(payload)
  } catch (err: any) {
    let error: AxiosError<ValidationErrors> = err
    if (!error.response) {
      throw err
    }
    // We got validation errors, let's return those so we can reference in our component and set form errors
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Login user
export const login = createAsyncThunk<
  User,
  LoginPayload,
  {
    rejectValue: ValidationErrors
  }
>('auth/login', async (payload: LoginPayload, thunkAPI) => {
  try {
    return await authService.login(payload)
  } catch (err: any) {
    let error: AxiosError<ValidationErrors> = err
    if (!error.response) {
      throw err
    }
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const logout = createAsyncThunk('auth/logout', () => {
  return authService.logout()
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.user = null
        if (action.payload) {
          // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
          state.message = action.payload.message
        } else {
          state.message = action.error.message
        }
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.user = null
        console.log(action)
        if (action.payload) {
          // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
          state.message = action.payload.message
        } else {
          state.message = action.error.message
        }
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false
        state.user = null
      })
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer
