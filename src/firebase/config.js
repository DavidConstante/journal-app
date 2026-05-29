import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'

const env = import.meta.env

// Public Firebase web config — these are client identifiers, not secrets.
// Access is enforced by Firestore Security Rules. Override with .env (VITE_FIREBASE_*).
const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || 'AIzaSyDQgV7BBDbQLIfWgWoWorNzgLCpz6jr080',
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || 'react-cursos-9ad79.firebaseapp.com',
  projectId: env.VITE_FIREBASE_PROJECT_ID || 'react-cursos-9ad79',
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || 'react-cursos-9ad79.appspot.com',
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || '729081740474',
  appId: env.VITE_FIREBASE_APP_ID || '1:729081740474:web:d791bf8195c7f1ea1dd683',
}

export const FirebaseApp = initializeApp(firebaseConfig)
export const FirebaseAuth = getAuth(FirebaseApp)
export const FirebaseDB = getFirestore(FirebaseApp)
