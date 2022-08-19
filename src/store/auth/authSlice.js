import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', //no-authenticated , authenticated
        uid: null,
        email: null,
        displayName: null,
        pothoURL: null,
        errorMessage: null
    },
    reducers: {

        login: (state, action) => {

        },
        logout: (state, action) => {

        },
        chekingCredentials: (state) => {

        }
    }
});


// Action creators are generated for each case reducer function
export const { login, logout, chekingCredentials } = authSlice.actions