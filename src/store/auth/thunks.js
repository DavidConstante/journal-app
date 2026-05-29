import {
  signInWithGoogle,
  registerWithEmailAndPassword,
  loginWithEmailAndPassword,
  logoutFirebase,
} from '@/firebase/providers'
import { clearNotesLogout } from '@/store/journal'
import { checkingCredentials, login, logout } from './authSlice'

export const checkingAuthentication = () => async (dispatch) => {
  dispatch(checkingCredentials())
}

export const startGoogleSignIn = () => async (dispatch) => {
  dispatch(checkingCredentials())
  const result = await signInWithGoogle()
  if (!result.ok) return dispatch(logout({ errorMessage: result.errorMessage }))
  dispatch(login(result))
}

export const startCreatingUserWithEmailAndPassword =
  ({ email, password, displayName }) =>
  async (dispatch) => {
    dispatch(checkingCredentials())
    const { ok, errorMessage, uid, photoURL } = await registerWithEmailAndPassword({
      email,
      password,
      displayName,
    })
    if (!ok) return dispatch(logout({ errorMessage }))
    dispatch(login({ uid, displayName, email, photoURL }))
  }

export const startLoginWithEmailAndPassword =
  ({ email, password }) =>
  async (dispatch) => {
    dispatch(checkingCredentials())
    const { ok, errorMessage, uid, photoURL, displayName } = await loginWithEmailAndPassword({
      email,
      password,
    })
    if (!ok) return dispatch(logout({ errorMessage }))
    dispatch(login({ uid, email, photoURL, displayName }))
  }

export const startLogout = () => async (dispatch) => {
  await logoutFirebase()
  dispatch(clearNotesLogout())
  dispatch(logout({}))
}
