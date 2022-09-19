import { signInWithGoogle, registerWithEmailAndPassword, loginWithEmailAndPassword, logoutFirebase } from '../../firebase/providers'
import { clearNotesLogout } from '../journal'
import { chekingCredentials, login, logout } from './authSlice'

export const chechingAuthentication = () => {
  return async (dispatch) => {
    dispatch(chekingCredentials())
  }
}

export const startGoogleSigin = () => {
  return async (dispatch) => {
    dispatch(chekingCredentials())
    const rta = await signInWithGoogle()
    if (!rta.ok) return dispatch(logout(rta.errorMessage))

    dispatch(login(rta))
  }
}

export const startCreatingUserWithEmailAndPassword = ({ email, password, displayName }) => {
  return async (dispatch) => {
    dispatch(chekingCredentials())
    const { ok, errorMessage, uid, photoURL } = await registerWithEmailAndPassword({ email, password, displayName })
    if (!ok) return dispatch(logout({ errorMessage }))

    dispatch(login({ uid, displayName, email, photoURL }))
  }
}

export const startLoginWithEmailAndPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(chekingCredentials())
    const { ok, errorMessage, uid, photoURL, displayName } = await loginWithEmailAndPassword({ email, password })
    if (!ok) return dispatch(logout({ errorMessage }))

    dispatch(login({ uid, email, photoURL, displayName }))
  }
}

export const startLogOut = () => {
  return async (dispatch) => {
    await logoutFirebase()
    dispatch(clearNotesLogout())
    dispatch(logout({}))
  }
}
