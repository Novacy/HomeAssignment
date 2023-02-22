import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import dealReducer from '../features/deal/dealSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    deal: dealReducer,
    // comments: commentsReducer,
    // users: usersReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
