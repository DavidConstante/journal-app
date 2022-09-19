import { FirebaseAuth } from './config'
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth'

const googleProvider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
  try {
    const rta = await signInWithPopup(FirebaseAuth, googleProvider)
    // const credentials = GoogleAuthProvider.credentialFromResult(rta);

    const { displayName, email, photoURL, uid } = rta.user

    return {
      ok: true,
      // User Info

      displayName,
      email,
      photoURL,
      uid
    }
  } catch (error) {
    console.log(error)
    // Handle Errors here.
    const errorCode = error.code
    const errorMessage = error.message

    return {
      ok: false,
      // Error info
      errorCode,
      errorMessage
    }
  }
}

export const registerWithEmailAndPassword = async ({ email, password, displayName }) => {
  try {
    const rta = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
    const { uid, photoURL } = rta.user

    await updateProfile(FirebaseAuth.currentUser, { displayName })

    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName
    }
  } catch (error) {
    return { ok: false, errorMessage: error.message }
  }
}

export const loginWithEmailAndPassword = async ({ email, password }) => {
  try {
    const rta = await signInWithEmailAndPassword(FirebaseAuth, email, password)
    const { uid, photoURL, displayName } = rta.user

    return {
      ok: true,
      uid,
      email,
      photoURL,
      displayName
    }
  } catch (error) {
    return { ok: false, errorMessage: error.message }
  }
}

export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut()
}
