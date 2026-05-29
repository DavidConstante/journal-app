import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth'

import { FirebaseAuth } from './config'
import { friendlyAuthError } from '@/lib/firebase-errors'

const googleProvider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider)
    const { displayName, email, photoURL, uid } = result.user
    return { ok: true, displayName, email, photoURL, uid }
  } catch (error) {
    return { ok: false, errorMessage: friendlyAuthError(error) }
  }
}

export const registerWithEmailAndPassword = async ({ email, password, displayName }) => {
  try {
    const result = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
    const { uid, photoURL } = result.user
    await updateProfile(FirebaseAuth.currentUser, { displayName })
    return { ok: true, uid, photoURL, email, displayName }
  } catch (error) {
    return { ok: false, errorMessage: friendlyAuthError(error) }
  }
}

export const loginWithEmailAndPassword = async ({ email, password }) => {
  try {
    const result = await signInWithEmailAndPassword(FirebaseAuth, email, password)
    const { uid, photoURL, displayName } = result.user
    return { ok: true, uid, email, photoURL, displayName }
  } catch (error) {
    return { ok: false, errorMessage: friendlyAuthError(error) }
  }
}

export const logoutFirebase = async () => await FirebaseAuth.signOut()
