import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import dealService from './dealService'
import { Deals } from '../../types/models'
import { DealListPayload } from './dealPayload'
import type { AxiosError } from 'axios'
import { ValidationErrors } from '../../types/errors'
import { RootState } from '../../app/strore'

interface DealState {
  deals: Deals
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  message?: string
}

const initialState: DealState = {
  deals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const getDeals = createAsyncThunk<
  Deals,
  DealListPayload,
  {
    state: RootState
    rejectValue: ValidationErrors
  }
>(
  'deal/list',
  async (payload: DealListPayload, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user
      console.log('deals slice', token)
      if (token) return await dealService.listDeals(payload, 'token')
    } catch (err: any) {
      let error: AxiosError<ValidationErrors> = err
      if (!error.response) {
        throw err
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const dealSlice = createSlice({
  name: 'deal',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDeals.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getDeals.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.deals = action.payload
      })
      .addCase(getDeals.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        if (action.payload) {
          state.message = action.payload.message
        } else {
          state.message = action.error.message
        }
      })
  },
})

export const { reset } = dealSlice.actions
export default dealSlice.reducer
