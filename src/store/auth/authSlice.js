import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'checking', // checking  ,  no-authenticated , authenticated
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
  },
  reducers: {

    login: (state, { payload }) => {
      state.status = 'authenticated',
        state.uid = payload.uid,
        state.email = payload.email,
        state.displayName = payload.displayName,
        state.photoURL = payload.photoURL,
        state.errorMessage = null
    },
    logout: (state, action) => {
      state.status = 'no-authenticated',
        state.uid = null,
        state.email = null,
        state.displayName = null,
        state.photoURL = null,
        state.errorMessage = action.payload?.errorMessage
    },
    chekingCredentials: (state) => {
      state.status = 'checking'
    }
  }
})

// Action creators are generated for each case reducer function
export const { login, logout, chekingCredentials } = authSlice.actions
